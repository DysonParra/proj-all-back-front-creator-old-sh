/*
 * @fileoverview {FileName} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {FileName} fue realizada el 31/07/2022.
 * @Dev - La primera version de {FileName} fue escrita por Dyson A. Parra T.
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
