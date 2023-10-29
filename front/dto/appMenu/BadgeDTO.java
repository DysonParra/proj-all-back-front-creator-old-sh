/*
 * @fileoverview    {BadgeDTO}
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
 * TODO: Description of {@code BadgeDTO}.
 *
 * @author Dyson Parra
 * @since 11
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class BadgeDTO {

    private String title;
    private String classes;

}
