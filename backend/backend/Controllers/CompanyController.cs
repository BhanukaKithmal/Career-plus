using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private ApplicationDBContext _context {  get; }
        public IMapper _mapper { get; }

        public CompanyController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            Company newCompany = _mapper.Map<Company>(dto);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();
            return Ok("Company Created Successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            var companies = await _context.Companies.OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedCompanies = _mapper.Map<IEnumerable < CompanyGetDto >> (companies);

            return Ok(convertedCompanies);
        }

        //Read (Get Company by ID)
        [HttpGet]
        [Route("Get/{Id}")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompaniesById(long Id)
        {
            var companiesId = await _context.Companies.FindAsync(Id);
            if (companiesId == null)
            {
                return NotFound("Company Not Found");
            }
            var  convertedCompaniesById = _mapper.Map<CompanyGetDto>(companiesId);
            return Ok(convertedCompaniesById);
        }

        //Update

        //Delete
    }
}
