﻿
using System.Linq.Expressions;

namespace Application.Contracts
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        public Task<IEnumerable<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");
        public Task<IEnumerable<TResult>> GetAllAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null) where TResult : class;
        public Task<TEntity> GetAsync(
            Expression<Func<TEntity, bool>> filter,
            string includeProperties = "");
        public Task<TResult> GetAsync<TResult>(
            Expression<Func<TEntity, bool>> filter) where TResult : class;
        public Task<TEntity> AddAsync(TEntity item);
        public Task<TEntity> UpdateAsync(TEntity item);
        public Task<bool> Delete(TEntity item);
        public Task<bool> SaveAsync();
    }
}
