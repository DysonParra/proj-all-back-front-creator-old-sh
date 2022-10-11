/*
 * @fileoverview {PesajeDTO} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {PesajeDTO} fue realizada el 31/07/2022.
 * @Dev - La primera version de {PesajeDTO} fue escrita por Dyson A. Parra T.
 */
package com.rtc.cardinal.definicion.servicio.dto;

import lombok.NoArgsConstructor;
import java.util.Date;
import lombok.Data;

/**
 * TODO: Definición de {@code PesajeDTO}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class PesajeDTO {

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
