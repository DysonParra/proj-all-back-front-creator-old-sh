/*
 * @fileoverview    {RepositorioBase}
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

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * TODO: Definición de {@code RepositorioBase}.
 *
 * @param <T>
 *
 * @author Dyson Parra
 * @since 11
 */
public class RepositorioBase<T> implements RepositorioGenerico<T> {

    protected EntityManager entityManager;
    private Class<T> type;

    /**
     * TODO: Definición de {@code getEntityManager}.
     *
     * @return
     */
    public EntityManager getEntityManager() {
        return entityManager;
    }

    /**
     * TODO: Definición de {@code setEntityManager}.
     *
     * @param entityManager
     */
    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * TODO: Definición de {@code RepositorioBase}.
     *
     */
    public RepositorioBase() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        type = (Class) pt.getActualTypeArguments()[0];
    }

    /**
     * TODO: Definición de {@code guardarDatos}.
     *
     * @param t
     * @return
     */
    @Override
    public T guardarDatos(final T t) {
        entityManager.persist(t);
        return t;
    }

    /**
     * TODO: Definición de {@code eliminarDatos}.
     *
     * @param objeto
     */
    @Override
    public void eliminarDatos(final Object objeto) {
        entityManager.remove(entityManager.merge(objeto));
    }

    /**
     * TODO: Definición de {@code obtenerDatos}.
     *
     * @param id
     * @return
     */
    @Override
    public T obtenerDatos(final Object id) {
        return (T) entityManager.find(type, id);
    }

    /**
     * TODO: Definición de {@code actualizarCambios}.
     *
     * @param t
     * @return
     */
    @Override
    public T actualizarCambios(final T t) {
        return entityManager.merge(t);
    }

    /**
     * TODO: Definición de {@code obtenerTodos}.
     *
     * @return
     */
    @Override
    public Iterable<T> obtenerTodos() {
        CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = cb.createQuery(type);
        Root<T> root = criteriaQuery.from(type);
        criteriaQuery.select(root);
        TypedQuery<T> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }
}
