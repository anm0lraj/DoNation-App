import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Request = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [beneficiaryPhone, setBeneficiaryPhone] = useState();
    const [beneficiaryAadhar, setBeneficiaryAadhar] = useState();
    const [requestID, setRequestID] = useState("__");
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
    const { data: nextId } = useContractRead(contract, "nextId",)
    const { mutateAsync: fileRequest } = useContractWrite(contract, "fileRequest");

    const handleRequest = async (e) => {
        e.preventDefault();
        const notification = toast.loading("Raising Request");
        try {
            const data = await fileRequest([title, description, beneficiaryName, beneficiaryPhone, beneficiaryAadhar]);
            toast.success(`Request Raised! Note Your RequestId: ${nextId}`, {
                id: notification,
            });
            console.info("contract call successs", data);
            setRequestID(nextId.toString());
            setTitle("");
            setDescription("");
            setBeneficiaryName("");
            setBeneficiaryPhone();
            setBeneficiaryAadhar();
        } catch (err) {
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });
            console.error("contract call failure", err);
        }
    }

    return (
        <div className="text-center bg-white text-gray-800 py-24 px-6">
            <div className="container mx-auto my-auto w-1/2 border border-purple-500 bg-white">
                <div className="p-5 space-y-5 shadow-xl">
                    <h4 className="text-center text-3xl">Raise a request</h4>
                    <form>
                        <div className="grid grid-cols-2 gap-5">
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                                placeholder="First Name"
                                onChange={(e) => { setBeneficiaryName(e.target.value) }}
                            />
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                                placeholder="Last Name"
                            />
                            <input
                                type="email"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Email"
                            />
                            <input
                                type="tel"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Phone"
                                onChange={(e) => { setBeneficiaryPhone(e.target.value) }}
                            />
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Profession"
                            />
                            <input
                                type="number"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Aadhar Number"
                                onChange={(e) => { setBeneficiaryAadhar(e.target.value) }}
                            />
                            <input
                                type="text"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Request Title"
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                            <textarea
                                cols="10"
                                rows="5"
                                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                                placeholder="Tell us more about why do you need us..."
                                onChange={(e) => { setDescription(e.target.value) }}
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value="Submit Request"
                            className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full cursor-pointer"
                            onClick={handleRequest}
                        />
                    </form>
                </div>
            </div>
            <div className="container mx-auto my-10 w-1/2 border border-purple-500 bg-white">
                <div className="p-5 space-y-5 shadow-xl">
                    <h4 className="text-center text-3xl">Your Request ID is {requestID}</h4>
                </div>
            </div>
        </div>
    )
}

export default Request