package com.events.necessarydevilapp

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.ReactCookieJarContainer
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

class PinningSSLFactory : OkHttpClientFactory {

    override fun createNewNetworkModuleClient(): OkHttpClient {
        val certificatePinner = CertificatePinner.Builder()
            .add("events.necessarydevil.com", "sha256/MMOnADJxBF94wzrtLaKKY0yKYIRIbzJov0d5M/j6+Ic=") // <-- public key
            // Optional: add backup pin for key rotation
            // .add("yourdomain.com", "sha256/SecondBackupPublicKeyHash==")
            .build()

        return OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .cookieJar(ReactCookieJarContainer())
            .certificatePinner(certificatePinner)
            .build()
    }
}
