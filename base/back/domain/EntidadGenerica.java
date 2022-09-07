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
package com.rtc.project.definicion.dominio;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * TODO: Definición de {@code EntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@Entity
//@Table(name = "EntidadGenerica", schema = "unknown", catalog = "unknown")
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class EntidadGenerica implements Serializable {

    private static final long serialVersionUID = 1L;%fields%

}
