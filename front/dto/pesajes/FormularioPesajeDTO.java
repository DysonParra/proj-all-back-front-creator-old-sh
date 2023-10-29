/*
 * @fileoverview    {FormularioPesajeDTO}
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

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * TODO: Description of {@code FormularioPesajeDTO}.
 *
 * @author Dyson Parra
 * @since 11
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class FormularioPesajeDTO {

    private Long intId;
    private Long intTiqueteNumero;
    private String strPlaca;
    private String strCodigo;
    private Long intNumeroInterno;
    private String strTipoVehiculo;
    private String strConductor;
    private String strCedula;
    private String strProducto;
    private String strPlanta;
    private String strCliente;
    private String strTransportadora;
    private Date dtFechaHoraPesoVacio;
    private Date dtFechaHoraPesoLleno;
    private String strCiv;
    private String strDireccion;
    private String strEntregadoPor;
    private String strRecibidoPor;
    private String strShipment;
    private String strSello;
    private String strR;
    private String strContenedor;
    private String strObservacion;
    private String enmTipoIngreso;

}
