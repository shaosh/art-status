# Workflow

1. Comment
	1. Comment can be submitted at any time, except when a task is closed.
2. Download/Copy
	1. One and only download(copy) must happen before automatic/manual upload of art revision.
  2. After download start, the app will copy the cdr file from the source folder to the target folder.
  3. When copy is done, the app will open that cdr file in CorelDRW.
  4. After the cdr file is opened, the app will watch for any changes saved to the cdr file. The watch module is not sensitive enough, and there maybe some delays. You may need to press the Crtl+S more than once.
  5. When a change is detected, a popup will be displayed to remind the user to commit the change, which is basically copy the cdr file in the target folder back to the source folder, and upload the corresponding PDF to the Box. The user must select a PDF to upload, otherwise the commit button will stay disabled. 
  6. When the upload is finished, the latest PDF will be displayed in a BoxView card, and show Approve and Reject button.
  7. After a download is started, and before the PDF upload is completed, the task will be locked. That means the user can't start another download, can upload the changed CDR and PDF for once and only once.
3. Upload/Commit
  1. Upload is only allowed after a file is downloaded. 
  2. When a change happens to the downloaded file, a popup will appear and ask the user if he wants to commit the change. If true, the updated CDR will be copied back to the source folder, and overwrite te previous version; and the corresponding PDF will be uploaded to Box, so that we can display the latest version in the app.
  3. Because of the sensitivity issue of the file-change watch module, we provide a manual upload(the 5th tab). It requires the user to select both the correct CDR file, and the corresponding PDF file, to enable the upload button. 
  4. Upload will unlock a locked job. 
4. Review for Art Revision
	1. When an art revision PDF is uploaded, a PDF BoxView card will be added to the card list. 
	2. The latest Art Revision BoxView will display an Approve button and a Reject button. The user will only be able to comment and approve/reject this Art Revision, but not the previous Art Revision. 
	3. Before an Art Revision gets reviewed, no download or upload is allowed. 
	4. If an Art Revision is Approved, user will no longer be able to download or upload any Art Revisions. He is only allowed to upload a proof(4th tab).
	5. If an Art Revision is Rejected, user will have to start another art revision: download, edit, upload, and wait for approval.
5. Proof
	1. Proof only be allowed to be uploaded when an Art Revision gets approved. 
	2. User upload a PDF as proof, and that PDF will be displayed in a Proof card. 
	3. The latest Proof card will display Comment box, Approve, and Reject button. 
	4. One proof card needs be approved or rejected once and only once.
	5. If the proof is rejected, the user will have to upload another proof for approval. 
	6. If the proof is approved, the user will no longer be able to do any download or upload. The only allowed operation will be comment and close. 
6. Close
	1. No more comment, download and upload is allowed. 
	2. The only allowed operation is reopen.
7. Reopen
	1. Reopen is only allowed when a task is closed.
8. Status Change
	1. When user clicks the 3rd tab, art revision will start, and task status will be changed from working to locked.
	2. When user successfully uploads a CDR and its PDF, the task status will be changed from locked to working. 
	3. When a working task is closed, the task status will be changed from working to done.
	4. When a closed task is reopened, the task status will be changed from done t working. 
