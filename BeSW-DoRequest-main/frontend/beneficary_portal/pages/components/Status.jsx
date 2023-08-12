import React, { useState } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";

const Status = () => {
    const [id, setId] = useState(0);
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
    const { data: Requests } = useContractRead(contract, "Requests", id)
    return (
        <div className="text-center bg-white text-gray-800 py-24 px-6 pb-44">
            <div className="container mx-auto my-auto w-1/2 border border-purple-500 bg-white">
                <div className="p-5 space-y-5 shadow-xl">
                    <h5 className="text-center text-3xl">Check Status of the Request</h5>
                    <input
                        type="number"
                        className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-black-500 col-span-2"
                        placeholder="Your Request ID"
                        onChange={(e) => { setId(e.target.value) }}
                    />
                </div>
            </div>

            <div className="container mx-auto my-5 w-1/2 border border-purple-300 bg-purple-200">
                {Requests && Requests.title && (
                    <div>
                        <p className='status-render-title'><b>Request Details:</b></p>
                        <p className='status-render-text'><b>Request Id:</b> {(Requests.id).toString()}</p>
                        <p className='status-render-text'><b>Request by:</b> {(Requests.requestRegisteredBy).toString()}</p>
                        <p className='status-render-text'><b>Request Title:</b> {Requests.title}</p>
                        <p className='status-render-text'><b>Request Description:</b> {Requests.description}</p>
                        <p className='status-render-text'><b>Beneficiary Name:</b> {Requests.beneficiaryName}</p>
                        <p className='status-render-text'><b>Beneficiary Phone:</b> {(Requests.beneficiaryPhone).toString()}</p>
                        <p className='status-render-text'><b>Beneficiary Aadhar:</b> {(Requests.beneficiaryAadhar).toString()}</p>
                        <p className='status-render-text'><b>Approval Status:</b> {Requests.isApproved ? "Approved" : !Requests.exists ? "Declined" : "Approval Pending"}</p>
                        <p className='status-render-text'><b>Approval Remark:</b> {Requests.approvalRemark}</p>
                        <p className='status-render-text'><b>Resolution Status:</b> {Requests.isResolved ? "Resolved" : "Resolution pending"}</p>
                        <p className='status-render-text mb-2'><b>Resolution Remark:</b> {Requests.resolutionRemark}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Status