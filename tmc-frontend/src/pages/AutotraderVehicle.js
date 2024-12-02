import axios from "axios"
import { useEffect } from "react"
import MainLayout from "../layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
 
export default function AutotraderVehicle(props) { 
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    
    useEffect(() => {
        const VRN = queryParams.get("VRM")
        const token = localStorage.getItem("jwtToken");
        axios
        .post(`https://${process.env.REACT_APP_API}/api/autotrader/retrieveVehicleByRegistration`, { registration: VRN }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            console.log(res.data.data.vehicle)
            const {make, model, derivative: desc, transmissionType: method, fuelType: fuel, vin} = res.data.data.vehicle
            navigate(`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
            .toLowerCase()
            .replace(/[^0-9a-zA-Z \-]/g, "")
            .replace(/\s/g, "-")}/${vin}`)
        })
        .catch(e => navigate("/"))
    }, [])
    return (
        <MainLayout>
            <center style={{ marginTop: 50 }}>
                <Spinner />
            </center>
        </MainLayout>
    );
}
