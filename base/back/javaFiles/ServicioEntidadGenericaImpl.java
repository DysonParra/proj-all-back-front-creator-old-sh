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
package com.rtc.project.definicion.servicio.implementacion;

import com.rtc.project.definicion.dominio.EntidadGenerica;
import com.rtc.project.definicion.repositorio.RepositorioEntidadGenerica;
import com.rtc.project.definicion.servicio.ServicioEntidadGenerica;
import com.rtc.project.definicion.servicio.dto.EntidadGenericaDTO;
import com.rtc.project.definicion.servicio.implementacion.excepciones.ExcepcionEntidadNoEncontrado;
import com.rtc.project.definicion.servicio.mapeo.MapeoEntidadGenerica;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * TODO: Definición de {@code ServicioEntidadGenericaImpl}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@Service
@Transactional
public class ServicioEntidadGenericaImpl implements ServicioEntidadGenerica {

    private final Logger log = LoggerFactory.getLogger(ServicioEntidadGenericaImpl.class);

    private final RepositorioEntidadGenerica repositorioEntidad;

    private final MapeoEntidadGenerica mapeoEntidad = Mappers.getMapper(MapeoEntidadGenerica.class);

    /**
     * TODO: Definición de {@code ServicioEntidadGenericaImpl}.
     *
     * @param repositorioEntidad
     */
    public ServicioEntidadGenericaImpl(RepositorioEntidadGenerica repositorioEntidad) {
        this.repositorioEntidad = repositorioEntidad;
    }

    /**
     * TODO: Definición de {@code guardarActualizar}.
     *
     * @param entidadDTO
     * @throws java.lang.Exception
     */
    @Override
    public EntidadGenericaDTO guardarActualizar(EntidadGenericaDTO entidadDTO) throws Exception {
        log.debug("Solicitud para guardar la entidad tipo EntidadGenerica: {}", entidadDTO);

        //TODO: agregar validacion especifica del servicio.

        EntidadGenerica entidad = mapeoEntidad.obtenerEntidad(entidadDTO);
        entidad = repositorioEntidad.save(entidad);

        EntidadGenericaDTO entidadActual = mapeoEntidad.obtenerDto(entidad);
        return entidadActual;
    }

    /**
     * TODO: Definición de {@code obtenerEntidades}.
     *
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public List<EntidadGenericaDTO> obtenerEntidades() throws Exception {
        log.debug("Solicitud para listar todas las Entidades tipo EntidadGenerica");
        return mapeoEntidad.obtenerDto(repositorioEntidad.findAll());
    }

    /**
     * TODO: Definición de {@code buscarEntidad}.
     *
     * @param id
     * @throws java.lang.Exception
     */
    @Override
    public EntidadGenericaDTO buscarEntidad(String id) throws Exception {
        log.debug("Solicitud para buscar la Entidad tipo EntidadGenerica: {}", id);
        EntidadGenerica entidadBuscada = repositorioEntidad.findById(%parseId%(id))
                .orElseThrow(() -> new ExcepcionEntidadNoEncontrado(id));
        return mapeoEntidad.obtenerDto(entidadBuscada);
    }

    /**
     * TODO: Definición de {@code obtenerEntidades}.
     *
     * @param strId
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public List<EntidadGenericaDTO> obtenerEntidades(String strId) throws Exception {
        log.debug("Solicitud para listar todas las Entidades tipo EntidadGenerica: {}", strId);
        return (List<EntidadGenericaDTO>) mapeoEntidad.obtenerDto(repositorioEntidad.findByIntIdEntidadGenerica(%parseId%(strId)));
    }

    /**
     * TODO: Definición de {@code obtenerEntidades}.
     *
     * @param pageable
     * @return
     * @throws java.lang.Exception
     */
    @Override
    public Page<EntidadGenericaDTO> obtenerEntidades(Pageable pageable) throws Exception {
        log.debug("Solicitud para listar todas las Entidades tipo EntidadGenerica con paginacion");
        return repositorioEntidad.findAll(pageable).map( mapeoEntidad::obtenerDto);
    }

    /**
     * TODO: Definición de {@code eliminarEntidad}.
     *
     * @param id
     * @throws java.lang.Exception
     */
    @Override
    public void eliminarEntidad(String id) throws Exception {
        log.debug("Solicitud para eliminar la entidad tipo EntidadGenerica: {}", id);
        repositorioEntidad.deleteById(%parseId%(id));
    }

    /**
     * TODO: Definición de {@code query}.
     *
     * @param query
     * @param pageable
     * @return
     */
    @Transactional(readOnly = true)
    public Page<EntidadGenericaDTO> query(String query, Pageable pageable) {
        log.debug("Solicitud para buscar una pagina de la entidad tipo EntidadGenerica para consulta {}", query);
        return repositorioEntidad.buscarEntidades(query, pageable).map(mapeoEntidad::obtenerDto);
    }
}
