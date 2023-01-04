/*
 * @fileoverview {RepositorioGenerico} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {RepositorioGenerico} fue realizada el 31/07/2022.
 * @Dev - La primera version de {RepositorioGenerico} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.repositorio;

/**
 * TODO: Definición de {@code RepositorioGenerico}.
 *
 * @author Dyson Parra
 * @param <T>
 * @since 1.8
 */
public interface RepositorioGenerico<T> {

    /**
     * TODO: Definición de {@code guardarDatos}.
     *
     * @param t
     * @return
     */
    public T guardarDatos(T t);

    /**
     * TODO: Definición de {@code eliminarDatos}.
     *
     * @param t
     */
    public void eliminarDatos(T t);

    /**
     * TODO: Definición de {@code obtenerDatos}.
     *
     * @param t
     * @return
     */
    public T obtenerDatos(T t);

    /**
     * TODO: Definición de {@code actualizarCambios}.
     *
     * @param t
     * @return
     */
    public T actualizarCambios(T t);

    /**
     * TODO: Definición de {@code obtenerTodos}.
     *
     * @return
     */
    public Iterable<T> obtenerTodos();
}
