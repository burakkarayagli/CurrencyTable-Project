package com.example.currency;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class Controller {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private TextFileHandler textFileHandler;

    int counter = 0;
    @Scheduled(fixedRate = 3000)
    public void sendCurrencyPairData() throws IOException {
        // Get currency pair data from your application.
        JsonNode currencyPairData = textFileHandler.getJsonFileContents();
        //System.out.println("Sending currency pair data" + counter++);
        //System.out.println(currencyPairData.toPrettyString());

        // Send the currency pair data to the WebSocket topic.
        messagingTemplate.convertAndSend("/broadcast", currencyPairData);
    }

    @GetMapping("/currency-pair-data")
    public JsonNode getCurrencyPairData() throws IOException {
        return textFileHandler.getJsonFileContents();
    }
}
