var request = require('../../node_modules/request'),		
		validurl = require('../../node_modules/valid-url'),
		Q = require('../../node_modules/q'),
		mkdirp = require('../../node_modules/mkdirp'),
		fs = require('fs'),
		//TODO: Update apikey
		apiKey = '84a2e87d63c6a4f70aa6d232e1dc35e938f11d2a',
		jobUrl = 'https://sandbox.zamzar.com/v1/jobs/',
		fileUrl = 'https://sandbox.zamzar.com/v1/files/',
		formData ={
			target_format: 'pdf'
		},
		interval = 1 * 1000;

var zamzar = {
	convert: function(file, filename){
		var stream = _createReadStream(file);
		formData['source_file'] = stream;
		return _startConversion(formData)
			.then(function(res){return _waitConversion(res);}, function(e){_outputError(e);})
			.then(function(res){return _downloadFile(res, filename);}, function(e){_outputError(e);});
	}
};

var _createReadStream = function(file){
	// Create a readstream from the file input
	// File input could be a url or filepath
	var uri = validurl.is_web_uri(file);
	if (uri){
		return request(uri);
	} else {
		return fs.createReadStream(file);
	}
};

var _startConversion = function(formData){
	var deferred = Q.defer();
	request.post({url:jobUrl, formData: formData}, function (err, response, body) {
    if (!!err) {
  		var error = 'Unable to start conversion job' + err;
      deferred.reject(error);
    } 
    else {
      console.log('SUCCESS! Conversion job started:', JSON.parse(body));
      deferred.resolve(JSON.parse(body));
    }
	}).auth(apiKey, '', true);
	return deferred.promise;
};

var _waitConversion = function(data){
	var jobid = data.id,
			deferred = Q.defer();
	var id;

	var checkConversion = function(){
		request.get (jobUrl + jobid, function (err, response, body) {
	    if (err) {
	    	var error = 'Still converting...' + err;
	    	console.log(error);
      	deferred.reject(error);
	    } 
	    else {
	  		clearInterval(id);
	  		console.log('SUCCESS! Conversion job completeded:', JSON.parse(body));
	  		deferred.resolve(JSON.parse(body));
	    }
		}).auth(apiKey, '', true);
	};

	id = setInterval(checkConversion, interval);
	return deferred.promise;
};

var _downloadFile = function(data, filename){
	var fileid = data.target_files[0].id,
			foldername = 'tmp',
			localFilename = foldername + '/' + filename,
			deferred = Q.defer();			
	mkdirp.sync(foldername);
	var r = request.get({url: fileUrl + fileID + '/content', followRedirect: false}, function (err, response, body) {
    if (err) {
    	var error = 'Unable to download file:' + err;
      deferred.reject(error);
    } 
    else {
      if (response.statusCode === 307) {
        // Download file from the redirect link
        var fileRequest = request(response.headers.location);
        fileRequest.on('response', function (res) {
            res.pipe(fs.createWriteStream(localFilename));
        });
        fileRequest.on('end', function () {
            console.log('File download complete');
            deferred.resolve(localFilename);
        });
      }
    }
	}).auth(apiKey,'',true).pipe(fs.createWriteStream(localFilename));
	r.on('end', function(){
		console.log('File download complete');
    deferred.resolve(localFilename);
	});
	return deferred.promise;
};

var _outputError = function(err){
	console.log(err);
}

module.exports = zamzar;