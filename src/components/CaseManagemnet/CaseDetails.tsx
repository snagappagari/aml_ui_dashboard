import React, { useEffect, useRef, useState } from 'react';
import Upload from "../../assets/Upload.svg";
import { formatDate } from '../../commonUtils/FormateDate';
import CaseService from '../../Services/CaseService';
import { BASE_URL } from '../../commonUtils/Base';
import { CASE_MANAGEMANT_URL } from '../../commonUtils/ApiConstants';

// Define the Alert type

export interface Comment {
  commentId: string;
  caseId: string;
  alertId: string | null; // Can be null
  content: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
}
export interface Attachment {
  attachmentId: string;
  caseId: string;
  createdAt: string; // Consider using Date if you plan to parse it: Date;
  location: string;
  name: string;
  size: string;
  updatedAt: string; // Consider using Date if needed
  userId: string;
}
export interface Case {

  alertId: string;
  alertSent: string | null;
  attachments: Attachment[] | null;
  caseId: string;
  caseOwner: string | null;
  caseType: string;
  city: string | null;
  comments: Comment[] | null;
  country: string;
  createdAt: string;
  description: string | null;
  network: string | null;
  priority: string | null;
  region: string;
  status: string;
  updatedAt: string;
  transactionId: string | null

}



interface AlertDetailsProps {
  selectedAlert: Case | null;
  onBackToTable: () => void;
  getDetails: (id: any) => void
}

const CaseDetails: React.FC<AlertDetailsProps> = ({ selectedAlert, getDetails, onBackToTable }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [comments, setComments] = useState<string[]>([""]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedComments, setSubmittedComments] = useState<Comment[]>([])
  const [submittedfiles, setSubmittedfiles] = useState<Attachment[]>([])// Start with one input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    // Mock file upload function (Replace with actual API call)
    console.log("Uploading file:", file.name);

    // setTimeout(() => {
    //   alert(`File "${file.name}" uploaded successfully!`);
    // }, 1000);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleInputChange = (index: number, value: string) => {
    const updatedComments = [...comments];
    updatedComments[index] = value;
    setComments(updatedComments);
  };
  useEffect(() => {
    if (selectedAlert && selectedAlert.comments !== null && selectedAlert.comments.length > 0) {
      setSubmittedComments(selectedAlert?.comments)
    }
    if (selectedAlert && selectedAlert.attachments !== null && selectedAlert.attachments.length > 0) {
      setSubmittedfiles(selectedAlert?.attachments)
    }
  }, [])


  // const handleSubmit = () => {
  //   const validComments = comments.filter((comment) => comment.trim() !== ""); // Ignore empty comments
  //   if (validComments.length > 0) {
  //     setSubmittedComments(validComments); // Store only valid comments
  //     setComments([""]); // Reset input fields
  //   }
  // };

  const handleCopy = async (id: any) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(id);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } catch (err) {
        console.error("Clipboard API failed, using fallback", err);
        fallbackCopy(id);
      }
    } else {
      console.warn("Clipboard API not supported, using fallback");
      fallbackCopy(id);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevents scrolling to the element
    textarea.style.opacity = "0"; // Hides the textarea
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand("copy");

      if (!successful) {
        throw new Error("Copy command was unsuccessful");
      } else {
        setShowTooltip(true);
      }
    } catch (err) {
      console.error("Fallback: Copying text failed", err);
      alert("Copy failed. Please try manually.");
    } finally {
      document.body.removeChild(textarea);
    }
  };






  if (!selectedAlert) {
    return null;
  }


  const commitComment = () => {
    const obj = {

      "content": comments[0],
      "caseId": selectedAlert?.caseId

    }

    CaseService.caseComments(obj).then((res) => {
      if (res && res.status === 200) {
        getDetails(selectedAlert?.caseId)

      }

    })
  }
  const sentFileUpload = async (file: any) => {
    // if (!selectedFile) {
    //   document.getElementById('csvFileInput')?.click();
    //   return;
    // }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, 'formData')
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    const token = sessionStorage.getItem("token");

    try {
      // Make API call

      const response = await fetch(BASE_URL + CASE_MANAGEMANT_URL.uploadDcuments + "/" + selectedAlert?.caseId, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`, // Replace with actual token
        },
      });
      console.log(response)
      // Check response
      if (response && response.status === 200) {
        getDetails(selectedAlert?.caseId)
      }
      // Parse response
      // const responseData = await response.json();
      // Check for SUCCESS message

    } catch (error) {
      console.error("Upload error:", error);
      // setError(error instanceof Error ? error.message : "File upload failed. Please try again.");
    }

    // fetch(endpoint, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     alert(data.message);
    //   })
    //   .catch(error => {
    //     console.error("Error:", error);
    //     alert("File upload failed. Please try again.");
    //   });
  };




  return (
    <div className="bg-white rounded-lg shadow mt-5">
      <div className="p-5">
        {/* <div className="flex items-center mb-4">
          <button
            onClick={onBackToTable}
            className="flex items-center mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="ml-2">Case Details</span>
          </button>


        </div> */}

        <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" onClick={() => onBackToTable()}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>

          <div className="relative">
            <p className="text-black text-xl font-medium">Case</p>
          </div>
        </div>

        <div className="mb-6 p-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Case Id</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.caseId}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Case Type</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.caseType}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Case Owner</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.caseOwner}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Created At</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.createdAt ? formatDate(selectedAlert.createdAt) : ''}</p>
            </div>

            {/* <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Status</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.status}</p>
            </div> */}
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Status</h4>
              <p
                className={`text-sm mb-1 font-normal font-lexend ${selectedAlert.status === "OPEN"
                  ? "text-red-500"
                  : selectedAlert.status === "CLOSED"
                    ? "text-green-500"
                    : selectedAlert.status === "CRITICAL"
                      ? "text-purple-500"
                      : selectedAlert.status === "IN PROGRESS"
                        ? "text-orange-500"
                        : "text-gray-500"
                  }`}
              >
                {selectedAlert.status}
              </p>

            </div>



            {/* <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Customer Id</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.customerId}</p>
            </div> */}

            <div className="flex flex-col gap-1 relative">
              {/* Title & Icon in a Row */}
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-light font-lexend">Alert Id</h4>

                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                    onClick={() => handleCopy(selectedAlert.alertId)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>

                  {/* Black Tooltip */}
                  {showTooltip && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md">
                      Copied!
                    </div>
                  )}
                </div>
              </div>

              {/* Customer ID Value Below */}
              <p className="text-sm font-normal font-lexend">{selectedAlert.alertId}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Alert Sent </h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.alertSent}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Transaction Id </h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.transactionId}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">network </h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.network}</p>
            </div>

            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">country</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.country}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Region</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.region}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">City</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.city}</p>
            </div>


            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Description</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.description}</p>
            </div>

            <div>
              <h4 className="text-sm mb-1 font-light font-lexend">Priority</h4>
              <p className="text-sm mb-1 font-normal font-lexend">{selectedAlert.priority}</p>
            </div>






          </div>
          <div className=' pt-2'>
            <div>
              <h2 className='mb-1'>Comment</h2>
              {comments.map((comment, index) => (
                <div key={index} style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
                  <textarea
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Add your comment here..."
                    value={comment}
                    onChange={(e) => handleInputChange(index, e.target.value)}

                  ></textarea>
                  {/* <button onClick={addCommentField}>+</button>
                {comments.length > 1 && <button onClick={() => removeCommentField(index)}>−</button>} */}
                </div>
              ))}
            </div>


            {comments[0] !== '' &&
              <div className="flex justify-end mt-4">
                <button onClick={commitComment} className="bg-[#0a8fff] text-white px-6 py-2 rounded-md items-end">
                  Submit
                </button>
              </div>}

            {submittedComments.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Comments:</h3>
                </div>


                <ul style={{ paddingLeft: "20px" }}>
                  {submittedComments.map((comment, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      {/* <span style={{ marginRight: "8px" }}>•</span> Adds a bullet dot */}
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-3 h-3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>

                        <span className="text-sm font-normal font-lexend">{comment?.content}</span>
                      </div>

                    </li>
                  ))}
                </ul>

              </div>
            )}




          </div>
        </div>
        <div className='px-6'>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center " >
            <div

              onClick={handleClick}
            >
              <div className="text-gray-500 mb-4" >
                <img
                  src={Upload} // Replace with your upload icon
                  alt="Upload"
                  className="mx-auto mb-4 w-15 h-15"
                />
                {selectedFile ? `📂 ${selectedFile.name} file uploaded` : "Click to upload file (Max. file size 20 MB)"}
              </div>

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>

            <div className="flex flex-col items-center">

              {selectedFile && <button
                className="bg-[#0a8fff] text-white px-6 py-2 rounded-md"
                onClick={() => sentFileUpload(selectedFile)}
              >
                Upload & Process
              </button>}
            </div>
          </div>
        </div>
        {submittedfiles.length > 0 && (
          <div className="mt-5 px-6">
            <div className="flex items-center gap-2 mb-2">
              {/* New SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>

              {/* Attachments Text */}
              <h3 className="text-lg font-semibold">Attachments:</h3>
            </div>



            <div className="grid grid-cols-3 gap-4">
              {submittedfiles.map((file, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-3 flex items-center justify-between"
                >
                  <span className="text-sm font-normal">{file?.name}</span>
                  <span className="text-lg">📂</span>
                </div>
              ))}
            </div>
          </div>
        )}







      </div>
    </div >
  );
};

export default CaseDetails;