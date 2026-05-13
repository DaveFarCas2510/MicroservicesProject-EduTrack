package com.edutrack.gateway.config;

import io.netty.channel.ChannelOption;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.time.Duration;

@Configuration
public class GatewayConfig {

    @Bean
    public HttpClient gatewayHttpClient() {
        return HttpClient.create(ConnectionProvider.newConnection())
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 120000)
                .responseTimeout(Duration.ofSeconds(120))
                .followRedirect(true);
    }
}
