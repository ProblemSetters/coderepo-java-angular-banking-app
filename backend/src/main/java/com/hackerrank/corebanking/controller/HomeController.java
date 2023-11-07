package com.hackerrank.corebanking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String getHome() {
        return "Backend is working fine";
    }

    @GetMapping("favicon.ico")
    @ResponseBody
    void noFavicon() {
    }
}
