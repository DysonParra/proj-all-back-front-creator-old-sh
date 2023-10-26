/*
 * @fileoverview    {MenuDTO}
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementation done.
 * @version 2.0     Documentation added.
 */
package com.rtc.cardinal.definicion.servicio.dto;

import lombok.NoArgsConstructor;
import lombok.Data;

/**
 * TODO: Definición de {@code MenuDTO}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class MenuDTO {

    private String id;
    private String title;
    private String subtitle;
    private String type;
    private String icon;
    private String link;
    private Boolean exactMatch;
    private Boolean active;
    private Boolean disabled;
    private String badge;
    private String father;

}
