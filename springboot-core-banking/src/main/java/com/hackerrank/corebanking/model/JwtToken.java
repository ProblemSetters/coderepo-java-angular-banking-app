package com.hackerrank.corebanking.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class JwtToken {
    private String name;
    private String value;
}
