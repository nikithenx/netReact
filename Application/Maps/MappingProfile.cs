﻿using AutoMapper;
using Domain.Projects;
using Domain.Sponsors;
using Domain.Tags;
using Domain.AppUsers;
using Application.DTOs.Projects;
using Application.DTOs.AppUsers;
using Application.DTOs.Tags;
using Application.DTOs.Sponsors;

namespace Application.Maps
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<AppUser, AppUserForSearchDto>().MaxDepth(1);
            CreateMap<AppUserForProjectCreationDto, ProjectAppUser>().MaxDepth(1);

            CreateMap<Project, ProjectCreateDto>().MaxDepth(1).ReverseMap();
            CreateMap<Project, ProjectUpdateDto>().MaxDepth(1).ReverseMap();
            CreateMap<Project, ProjectDto>()
                .ForMember(q => q.SponsorName, opt => opt.MapFrom(q => q.Sponsor.Forename + " " + q.Sponsor.Surname))
                .MaxDepth(1).ReverseMap();

            CreateMap<Sponsor, SponsorDto>().MaxDepth(1).ReverseMap(); 
            CreateMap<Sponsor, SponsorCreateDto>().MaxDepth(1).ReverseMap();
            CreateMap<Sponsor, SponsorReadOnlyDto>().MaxDepth(1);

            CreateMap<Tag, TagBaseDto>().MaxDepth(1);

            CreateMap<TagForProjectCreationDto, ProjectTag>().MaxDepth(1);
        }
    }
}
