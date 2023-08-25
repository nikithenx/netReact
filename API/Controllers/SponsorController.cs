using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Contracts;
using Domain.Sponsors;
using Application.DTOs.Sponsors;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public class SponsorController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SponsorController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var sponsors = await _unitOfWork.SponsorRepository.GetAllAsync<SponsorDto>(
                    orderBy: q => q.OrderByDescending(x => x.Surname));
                return Ok(sponsors);
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
        public async Task<IActionResult> Create([FromBody] SponsorCreateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var sponsor = _mapper.Map<Sponsor>(dto);
                var response = await _unitOfWork.SponsorRepository.AddAsync(sponsor);

                return response.Id > 0
                    ? Created("", response.Id)
                    : StatusCode(StatusCodes.Status500InternalServerError, "Id not incremented");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
