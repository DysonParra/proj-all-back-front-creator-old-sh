/*
 * @fileoverview    {RepositorioGenerico}
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
package com.rtc.project.definicion.repositorio;

/**
 * TODO: Description of {@code RepositorioGenerico}.
 *
 * @param <T>
 *
 * @author Dyson Parra
 * @since 11
 */
public interface RepositorioGenerico<T> {

    /**
     * TODO: Description of {@code guardarDatos}.
     *
     * @param t
     * @return
     */
    public T guardarDatos(T t);

    /**
     * TODO: Description of {@code eliminarDatos}.
     *
     * @param t
     */
    public void eliminarDatos(T t);

    /**
     * TODO: Description of {@code obtenerDatos}.
     *
     * @param t
     * @return
     */
    public T obtenerDatos(T t);

    /**
     * TODO: Description of {@code actualizarCambios}.
     *
     * @param t
     * @return
     */
    public T actualizarCambios(T t);

    /**
     * TODO: Description of {@code obtenerTodos}.
     *
     * @return
     */
    public Iterable<T> obtenerTodos();
}
