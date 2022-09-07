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
package com.rtc.project.definicion.repositorio;

/**
 * TODO: Definición de {@code RepositorioGenerico}.
 *
 * @author Dyson Parra
 * @param <T>
 * @since 1.8
 */
public interface RepositorioGenerico<T> {

    public T guardarDatos(T t);

    public void eliminarDatos(T t);

    public T obtenerDatos(T t);

    public T actualizarCambios(T t);

    public Iterable<T> obtenerTodos();
}
