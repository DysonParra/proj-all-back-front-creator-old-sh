/*
 * @fileoverview {RepositorioEntidadGenerica} se encarga de realizar tareas especificas.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History v1.0 --- La implementacion de {RepositorioEntidadGenerica} fue realizada el 31/07/2022.
 * @Dev - La primera version de {RepositorioEntidadGenerica} fue escrita por Dyson A. Parra T.
 */
package com.rtc.project.definicion.repositorio;

import com.rtc.project.definicion.dominio.EntidadGenerica;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * TODO: Definición de {@code RepositorioEntidadGenerica}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@Repository
public interface RepositorioEntidadGenerica extends JpaRepository<EntidadGenerica, %PkFormat%> {

    /**
     * TODO: Definición de {@code findByIntIdEntidadGenerica}.
     *
     * @param id
     * @return
     */
    public List<EntidadGenerica> findByIntIdEntidadGenerica(%PkFormat% id);

    /**
     * TODO: Definición de {@code buscarEntidades}.
     *
     * @param strBusqueda
     * @param pageable
     * @return
     */
    @Query("SELECT m FROM EntidadGenerica m WHERE m.intIdEntidadGenerica LIKE CONCAT('%', :strBusqueda, '%')")
    public Page<EntidadGenerica> buscarEntidades(@Param("strBusqueda") String strBusqueda, Pageable pageable);
}
