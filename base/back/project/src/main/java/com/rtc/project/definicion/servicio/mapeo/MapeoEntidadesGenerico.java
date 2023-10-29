/*
 * @fileoverview    {MapeoEntidadesGenerico}
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
package com.rtc.project.definicion.servicio.mapeo;

import java.util.List;

/**
 * FIXME: Definición de {@code MapeoEntidadesGenerico}.
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - DTO type parameter.
 * @param <E> - Entity type parameter.
 *
 * @author Dyson Parra
 * @since 11
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
