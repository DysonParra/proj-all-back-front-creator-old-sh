/*
 * @fileoverview    {RepositorioGenerico} se encarga de realizar tareas específicas.
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
