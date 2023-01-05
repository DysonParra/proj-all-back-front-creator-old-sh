/*
 * @fileoverview    {EntidadGenerica} se encarga de realizar tareas específicas.
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementación realizada.
 * @version 2.0     Documentación agregada.
 */
package com.rtc.project.definicion.dominio;

import lombok.*;
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
