/*
 * @fileoverview    {MapeoEntidadesGenerico} se encarga de realizar tareas específicas.
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
