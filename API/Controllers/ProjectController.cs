using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Contracts;
using Domain.Projects;
using Application.DTOs.Projects;

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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var response = await _unitOfWork.ProjectRepository.GetAsync<ProjectFullDto>(x => x.Id == id);

                return response is not null 
                    ? Ok(response)
                    : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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

                return response.Id > 0
                    ? Created("", response.Id)
                    : StatusCode(StatusCodes.Status500InternalServerError, "Id not incremented");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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
                    includeProperties: "AppUsers,Tags");

                if (isExists == null)
                {
                    return NotFound();
                }

                var isDeleted = await _unitOfWork.ProjectRepository.Delete(isExists);

                return isDeleted
                    ? NoContent()
                    : StatusCode(StatusCodes.Status500InternalServerError, "Deletion not successful"); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
