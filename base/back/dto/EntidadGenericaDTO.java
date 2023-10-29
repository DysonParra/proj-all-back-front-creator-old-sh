/*
 * @fileoverview    {EntidadGenericaDTO}
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
package com.rtc.project.definicion.servicio.dto;

import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TODO: Definición de {@code EntidadGenericaDTO}.
 *
 * @author Dyson Parra
 * @since 11
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
