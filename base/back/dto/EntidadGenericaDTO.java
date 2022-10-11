/*
 * @fileoverview {EntidadGenericaDTO} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {EntidadGenericaDTO} fue realizada el 31/07/2022.
 * @Dev - La primera version de {EntidadGenericaDTO} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.servicio.dto;

import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * TODO: Definición de {@code EntidadGenericaDTO}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class EntidadGenericaDTO {

    private Long intIdEntidadGenerica;
    private BigDecimal decCantidad;
    private String strUsuario;
    private Date dtFecha;
    private Long intIdEstadoEntidadGenerica;
    private String strCodigoProducto;
    private Long intIdUbicacion;

}
