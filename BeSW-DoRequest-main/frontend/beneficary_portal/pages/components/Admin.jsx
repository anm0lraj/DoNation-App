import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

const Getter = () => {
    const [id, setId] = useState(0);
    const [rId, setRId] = useState(0);
    const [aRemark, setARemark] = useState("");
    const [rRemark, setRRemark] = useState("");
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
    const { data: nextId } = useContractRead(contract, "nextId")
    const { data: pendingApprovals } = useContractRead(contract, "pendingApprovals", 0)
    const { data: pendingResolutions } = useContractRead(contract, "pendingResolutions", 0)
    const { mutateAsync: calcPendingApprovalIds } = useContractWrite(contract, "calcPendingApprovalIds")
    const { mutateAsync: calcPendingResolutionIds } = useContractWrite(contract, "calcPendingResolutionIds")

    const { mutateAsync: approveRequest } = useContractWrite(contract, "approveRequest")
    const { mutateAsync: resolveRequest } = useContractWrite(contract, "resolveRequest")
    const { mutateAsync: discardRequest } = useContractWrite(contract, "discardRequest")

    const getPendingApprovals = async () => {
        try {
            const data = await calcPendingApprovalIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const getPendingResolutions = async () => {
        try {
            const data = await calcPendingResolutionIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleApproveRequest = async (e) => {
        try {
            e.preventDefault();
            const data = await approveRequest([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleDeclineRequest = async (e) => {
        try {
            e.preventDefault();
            const data = await discardRequest([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleResolveRequest = async (e) => {
        try {
            e.preventDefault();
            const data = await resolveRequest([rId, rRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    return (
        <div className="text-center bg-white text-gray-800 py-24 px-6">

            <div className="container mx-auto my-auto w-1/2 border border-purple-500 bg-white">
                <div className="p-5 space-y-5 shadow-xl">
                    <h5 className="text-center text-3xl">Pending Approvals</h5>
                    <form>
                        <div className="grid grid-cols-2 gap-5">
                            <input
                                type="number"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Request ID"
                                onChange={(e) => { setId(e.target.value) }}
                            />
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Your Remarks"
                                onChange={(e) => { setARemark(e.target.value) }}
                            />
                            <input
                                type="submit"
                                value="Approve Request"
                                className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full cursor-pointer"
                                onClick={handleApproveRequest}
                            />
                            <input
                                type="submit"
                                value="Decline Request"
                                className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full cursor-pointer"
                                onClick={handleDeclineRequest}
                            />
                        </div>
                    </form>
                </div>
            </div>



            <div className="container mx-auto my-20 w-1/2 border border-purple-500 bg-white">
                <div className="p-5 space-y-5 shadow-xl">
                    <h5 className="text-center text-3xl">Pending Resolutions</h5>
                    <form>
                        <div className="grid grid-cols-2 gap-5">
                            <input
                                type="number"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Request ID"
                                onChange={(e) => { setRId(e.target.value) }}
                            />
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Your Remarks"
                                onChange={(e) => { setRRemark(e.target.value) }}
                            />
                            <input
                                type="submit"
                                value="Resolve Request"
                                className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold col-span-2 cursor-pointer"
                                onClick={handleResolveRequest}
                            />
                        </div>
                    </form>
                </div>
            </div>




            {/* <div className='getter-container md:p-[30px]  md:m-5 xl:flex xl:flex-row'>
                <div className='getter-card md:m-5'>
                    <p className='getter-card-title'>Pending Approvals</p>
                    <div className='flex items-center mt-3'>
                        <button className="button-common hover:bg-blue-900" onClick={getPendingApprovals}>Next Pending Approval ID</button>
                        {
                            pendingApprovals && (
                                <p className='getter-card-number'>: {pendingApprovals.toString()}</p>
                            )
                        }
                    </div>

                    <div className='md:flex items-center'>
                        <p className='text-2xl font-semibold'>Request Id: </p>
                        <input type="number" className='p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Id Here'
                            onChange={(e) => { setId(e.target.value) }} />
                    </div>
                    <div className='md:flex items-center'>
                        <p className='text-2xl font-semibold'>Your Remark: </p>
                        <input type="text" className='p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Remark Here'
                            onChange={(e) => { setARemark(e.target.value) }} />
                    </div>
                    <div className='flex'>
                        <button className="button-common hover:bg-blue-900" onClick={handleApproveRequest}>Approve Request</button>
                        <button className="button-common hover:bg-blue-900" onClick={handleDeclineRequest}>Decline Request</button>
                    </div>

                </div>
                <div className='getter-card md:m-5'>
                    <p className='getter-card-title'>Pending Resolutions</p>
                    <div className='flex items-center mt-3'>
                        <button className="button-common hover:bg-blue-900" onClick={getPendingResolutions}>Next Pending Resolution ID</button>
                        {
                            pendingResolutions && (
                                <p className='getter-card-number'>: {pendingResolutions.toString()}</p>
                            )
                        }

                    </div>

                    <div className='md:flex items-center'>
                        <p className='text-2xl font-semibold'>Request Id: </p>
                        <input type="number" className='getter-input md:w-[500px]' placeholder='Enter Id Here'
                            onChange={(e) => { setRId(e.target.value) }} />
                    </div>
                    <div className='md:flex items-center'>
                        <p className='text-2xl font-semibold'>Your Remark: </p>
                        <input type="text" className='getter-input md:w-[500px]' placeholder='Enter Remark Here'
                            onChange={(e) => { setRRemark(e.target.value) }} />
                    </div>
                    <button className="button-common hover:bg-blue-900" onClick={handleResolveRequest}>Resolve Request</button>
                </div>
            </div> */}
        </div>
    )
}

export default Getter