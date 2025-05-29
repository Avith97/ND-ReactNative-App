import { create } from "react-test-renderer"
import { environment } from "../../../settings"
import { store } from "../../redux/store"

export const BASE_URL = {
    // LIVE: 'https://jsonplaceholder.typicode.com/',
    // LIVE: 'https://192.168.1.49:8443/api/v1/',
    LIVE: 'https://events.necessarydevil.com/api/v1/',
    UAT: 'UAT',
    DEV: 'https://192.168.1.49:8443/api/v1/',
    PRE_PROD: 'PRE_PROD'
}

export const URL = {
    google: 'www.google.in',
    otp: 'login/otp',
    otp_verify: 'login/verify/otp',//{userName: "vinit@anssoft.in", otp: "122222", distKey: "TXK8vWYRPSXm08uXrZYV0g=="}//{code: "401", verbose: "Invalid OTP"}}
    create_profile: 'signup',
}
