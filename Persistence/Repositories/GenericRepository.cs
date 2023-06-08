using Microsoft.EntityFrameworkCore;
using Application.Contracts;
using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Persistence.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationDbContext _db;
        private readonly DbSet<TEntity> _dbSet;
        private readonly IMapper _mapper;

        public GenericRepository(ApplicationDbContext db, IMapper mapper) 
        { 
            _db = db;
            _dbSet = _db.Set<TEntity>();
            _mapper = mapper;
        }

        public async Task<TEntity> AddAsync(TEntity item)
        {
            await _dbSet.AddAsync(item);
            var success = await SaveAsync();
            return success ? item : null;
        }

        public async Task<bool> Delete(TEntity item)
        {
            _dbSet.Remove(item);
            return await SaveAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = ""
            )
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }

        public async Task<IEnumerable<TResult>> GetAllAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null) 
            where TResult : class
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                return await orderBy(query)
                    .ProjectTo<TResult>(_mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else
            {
                return await query
                    .ProjectTo<TResult>(_mapper.ConfigurationProvider)
                    .ToListAsync();
            }
        }

        public async Task<TEntity> GetAsync(
            Expression<Func<TEntity, bool>> filter, 
            string includeProperties = "")
        {
            if (string.IsNullOrEmpty(includeProperties))
            {
                return await _dbSet.FirstOrDefaultAsync(filter);
            }

            IQueryable<TEntity> query = _dbSet.Where(filter);

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<TResult> GetAsync<TResult>(
            Expression<Func<TEntity, bool>> filter) where TResult : class
        {
            IQueryable<TEntity> query = _dbSet.Where(filter);
            return await query.ProjectTo<TResult>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveAsync() 
            => await _db.SaveChangesAsync() > 0;

        public async Task<TEntity> UpdateAsync(TEntity item)
        {
            _dbSet.Update(item);
            var success = await SaveAsync();
            return success ? item : null;
        }
    }
}
