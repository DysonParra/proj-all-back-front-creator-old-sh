/*
 * @fileoverview {MapeoEntidadesGenerico} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {MapeoEntidadesGenerico} fue realizada el 31/07/2022.
 * @Dev - La primera version de {MapeoEntidadesGenerico} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.servicio.mapeo;

import java.util.List;

/**
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - DTO type parameter.
 * @param <E> - Entity type parameter.
 *
 * @author Dyson Parra
 * @since 1.8
 */
public interface MapeoEntidadesGenerico<D, E> {

    /**
     * TODO: Definición de {@code obtenerEntidad}.
     *
     * @param dto
     * @return
     */
    public E obtenerEntidad(D dto);

    /**
     * TODO: Definición de {@code obtenerDto}.
     *
     * @param entidad
     * @return
     */
    public D obtenerDto(E entidad);

    /**
     * TODO: Definición de {@code obtenerEntidad}.
     *
     * @param listaDto
     * @return
     */
    public List<E> obtenerEntidad(List<D> listaDto);

    /**
     * TODO: Definición de {@code obtenerDto}.
     *
     * @param listaEntidades
     * @return
     */
    public List<D> obtenerDto(List<E> listaEntidades);
}
