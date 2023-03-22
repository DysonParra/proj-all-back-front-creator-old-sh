/*
 * @fileoverview    {DefinicionApplication}
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
package com.rtc.project.definicion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TODO: Definición de {@code DefinicionApplication}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@SpringBootApplication
public class DefinicionApplication {

    /**
     * Entrada principal del sistema.
     *
     * @param args argumentos de la linea de comandos.
     */
    public static void main(String[] args) {
        SpringApplication.run(DefinicionApplication.class, args);
    }

}
