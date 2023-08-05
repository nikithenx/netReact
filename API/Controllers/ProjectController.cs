using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Contracts;
using Domain.Projects;
using Application.DTOs.Projects;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProjectController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetReadOnyList()
        {
            try
            {
                var response = await _unitOfWork.ProjectRepository.GetReadOnlyList();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(ProjectCreateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var project = _mapper.Map<Project>(dto);
                project.Nr = await _unitOfWork.ProjectRepository.ComputeNr();
                var response = await _unitOfWork.ProjectRepository.AddAsync(project);

                if (response.Id != 0)
                {
                    return new ObjectResult(true) { Value = response, StatusCode = StatusCodes.Status201Created };
                }

                return Created($"{ControllerContext.ActionDescriptor.ControllerName}", response.Id);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var isExists = await _unitOfWork.ProjectRepository.GetAsync(
                    filter: x => x.Id == id, 
                    includeProperties: $"{nameof(Project.AppUsers)},{nameof(Project.Tags)}");

                if (isExists == null)
                {
                    return NotFound();
                }

                var isSuccess = await _unitOfWork.ProjectRepository.Delete(isExists);
                if (isSuccess)
                {
                    return NoContent();
                }

                return new ObjectResult(false) { StatusCode = StatusCodes.Status500InternalServerError };
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }
    }
}
