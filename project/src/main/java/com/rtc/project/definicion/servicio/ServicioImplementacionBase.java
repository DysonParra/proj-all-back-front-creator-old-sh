/*
 * @fileoverview {ServicioImplementacionBase} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {ServicioImplementacionBase} fue realizada el 31/07/2022.
 * @Dev - La primera version de {ServicioImplementacionBase} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.servicio;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TODO: Definición de {@code ServicioImplementacionBase}.
 *
 * @author Dyson Parra
 * @param <T>
 * @since 1.8
 */
public class ServicioImplementacionBase<T> implements ServicioGenerico<T> {

    private Class<T> type;

    private final Logger log = LoggerFactory.getLogger(type);

    /**
     * TODO: Definición de {@code ServicioImplementacionBase}.
     *
     */
    public ServicioImplementacionBase() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        type = (Class) pt.getActualTypeArguments()[0];
    }

    /**
     * TODO: Definición de {@code guardarActualizar}.
     *
     * @param entidadDTO
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public T guardarActualizar(T entidadDTO) throws Exception {
        return null;
    }

    /**
     * TODO: Definición de {@code obtenerEntidades}.
     *
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public List<T> obtenerEntidades() throws Exception {
        return null;
    }

    /**
     * TODO: Definición de {@code buscarEntidad}.
     *
     * @param id
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public T buscarEntidad(String id) throws Exception {
        return null;
    }

    /**
     * TODO: Definición de {@code eliminarEntidad}.
     *
     * @param id
     * @throws java.lang.Exception
     */
    @Override
    public void eliminarEntidad(String id) throws Exception {

    }
}
