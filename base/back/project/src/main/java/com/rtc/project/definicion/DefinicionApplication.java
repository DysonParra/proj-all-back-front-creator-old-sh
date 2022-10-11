/*
 * @fileoverview {DefinicionApplication} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {DefinicionApplication} fue realizada el 31/07/2022.
 * @Dev - La primera version de {DefinicionApplication} fue escrita por Dyson A. Parra T.
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
