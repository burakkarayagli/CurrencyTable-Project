package com.example.currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ScheduledTasks {

    @Autowired
    private TextFileHandler textFileHandler;

    @Scheduled(fixedRate = 3000)
    public void changeCurrency() throws IOException {
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss:SSS"));
        textFileHandler.updateJsonFile();
    }

    //@Scheduled(fixedRate = 3000)
    public void printCurrency() throws IOException {
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss:SSS"));
        System.out.println(formattedDate + " " + textFileHandler.getJsonFileContents().toPrettyString());
    }
}

