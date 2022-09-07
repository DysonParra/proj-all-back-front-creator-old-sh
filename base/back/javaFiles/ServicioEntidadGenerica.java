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
package com.rtc.project.definicion.servicio;

import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * TODO: Definición de {@code ServicioEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
public interface ServicioEntidadGenerica extends ServicioGenerico<EntidadGenericaDTO> {

    public List<EntidadGenericaDTO> obtenerEntidades(String id) throws Exception;

    public Page<EntidadGenericaDTO> obtenerEntidades(Pageable pageable) throws Exception;

    public Page<EntidadGenericaDTO> query(String query, Pageable pageable);
}
