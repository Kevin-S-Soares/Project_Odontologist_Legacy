﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ModelTests.Tools;
using Moq;
using Server.Contexts;
using Server.Models;
using Server.Services.AuthService;
using Server.Services.ScheduleService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ModelTests.Services
{
    [TestClass]
    public class ScheduleServiceTests
    {
        private ScheduleService _model = default!;
        private Mock<IAuthService> _authMock = default!;

        private readonly IQueryable<Schedule> _dataSchedule = new List<Schedule>()
        {
            new()
            {
                Id = 1L,
                OdontologistId = 1L,
                StartDay = DayOfWeek.Monday,
                StartTime = new TimeSpan(9, 0, 0),
                EndDay = DayOfWeek.Monday,
                EndTime = new TimeSpan(18, 0, 0),
            },
            new()
            {
                Id = 2L,
                OdontologistId = 1L,
                StartDay = DayOfWeek.Tuesday,
                StartTime = new TimeSpan(9, 0, 0),
                EndDay = DayOfWeek.Tuesday,
                EndTime = new TimeSpan(18, 0, 0),
            }
        }.AsQueryable();

        private readonly IQueryable<Odontologist> _dataOdontologist = new List<Odontologist>()
        {
            new()
            {
                Id = 1L,
                Name = "Test Test",
                Email = "test@test.com",
                Phone = "(011) 91111-1111"
            },
            new()
            {
                Id = 2L,
                Name = "Test Test",
                Email = "test@test.com",
                Phone = "(011) 91111-1111"
            }
        }.AsQueryable();

        [TestInitialize]
        public void Setup()
        {
            var scheduleMockSet = new Mock<DbSet<Schedule>>();
            var odontologistMockSet = new Mock<DbSet<Odontologist>>();

            scheduleMockSet.BindData(_dataSchedule);
            odontologistMockSet.BindData(_dataOdontologist);

            _authMock = new();
            _authMock.Setup(x => x.IsAdmin()).Returns(true);
            _authMock.Setup(x => x.IsOdontologist()).Returns(false);
            _authMock.Setup(x => x.IsAttendant()).Returns(false);
            _authMock.Setup(x => x.GetSID()).Returns(1);

            var mockContext = new Mock<ApplicationContext>();
            mockContext.Setup(x => x.Schedules).Returns(scheduleMockSet.Object);
            mockContext.Setup(x => x.Odontologists).Returns(odontologistMockSet.Object);
            _model = new(mockContext.Object, _authMock.Object);
        }

        private readonly Schedule _input_0 = new()
        {
            Id = 3L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Wednesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task CreateValidSchedule_0()
        {
            var result = await _model.CreateAsync(_input_0);
            Assert.AreEqual(expected: StatusCodes.Status201Created,
                actual: result.StatusCode);
        }

        private readonly Schedule _input_1 = new()
        {
            Id = 3L,
            OdontologistId = 2L,
            StartDay = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Monday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task CreateValidSchedule_1()
        {
            var result = await _model.CreateAsync(_input_1);
            Assert.AreEqual(expected: StatusCodes.Status201Created,
                actual: result.StatusCode);
        }

        private readonly Schedule _input_2 = new()
        {
            Id = 3L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Monday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task CreateInvalidSchedule_0()
        {
            var result = await _model.CreateAsync(_input_5);
            Assert.AreEqual(expected: StatusCodes.Status400BadRequest,
                actual: result.StatusCode);
            Assert.AreEqual(expected: "Schedule overlaps other schedules",
                actual: result.ErrorMessage);
        }

        private readonly Schedule _input_3 = new()
        {
            Id = 2L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Wednesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task UpdateValidSchedule_0()
        {
            var result = await _model.UpdateAsync(_input_3);
            Assert.AreEqual(expected: StatusCodes.Status200OK,
                actual: result.StatusCode);
        }

        private readonly Schedule _input_4 = new()
        {
            Id = 2L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Tuesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Tuesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task UpdateValidSchedule_1()
        {
            var result = await _model.UpdateAsync(_input_4);
            Assert.AreEqual(expected: StatusCodes.Status200OK,
                actual: result.StatusCode);
        }

        private readonly Schedule _input_5 = new()
        {
            Id = 1L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Tuesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Tuesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task UpdateInvalidSchedule()
        {
            var result = await _model.UpdateAsync(_input_5);
            Assert.AreEqual(expected: StatusCodes.Status400BadRequest,
                actual: result.StatusCode);
            Assert.AreEqual(expected: "Schedule overlaps other schedules",
                actual: result.ErrorMessage);
        }

        private readonly Schedule _input_6 = new()
        {
            Id = 1L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Tuesday,
            StartTime = new TimeSpan(8, 0, 0),
            EndDay = DayOfWeek.Tuesday,
            EndTime = new TimeSpan(19, 0, 0),
        };

        [TestMethod]
        public async Task AddInvalidSchedule_1()
        {
            var result = await _model.UpdateAsync(_input_6);
            Assert.AreEqual(expected: StatusCodes.Status400BadRequest,
                actual: result.StatusCode);
            Assert.AreEqual(expected: "Schedule overlaps other schedules",
                actual: result.ErrorMessage);
        }


        private readonly Schedule _input_7 = new()
        {
            Id = 3L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Wednesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        private readonly Schedule _input_8 = new()
        {
            Id = 1L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Monday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task AdminAuthorized()
        {
            var result1 = await _model.CreateAsync(_input_7);
            var result2 = _model.FindById(_input_8.Id);
            var result3 = _model.FindAll();
            var result4 = await _model.UpdateAsync(_input_8);
            var result5 = await _model.DeleteAsync(_input_8.Id);

            Assert.AreEqual(expected: StatusCodes.Status201Created, actual: result1.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result2.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result3.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result4.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result5.StatusCode);
        }

        private readonly Schedule _input_9 = new()
        {
            Id = 3L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Wednesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        private readonly Schedule _input_10 = new()
        {
            Id = 1L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Monday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task OdontologistAuthorized()
        {
            _authMock.Setup(x => x.IsAdmin()).Returns(false);
            _authMock.Setup(x => x.IsOdontologist()).Returns(true);

            var result1 = await _model.CreateAsync(_input_9);
            var result2 = _model.FindById(_input_10.Id);
            var result3 = _model.FindAll();
            var result4 = await _model.UpdateAsync(_input_10);
            var result5 = await _model.DeleteAsync(_input_10.Id);

            Assert.AreEqual(expected: StatusCodes.Status201Created, actual: result1.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result2.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result3.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result4.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result5.StatusCode);
        }

        private readonly Schedule _input_11 = new()
        {
            Id = 3L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Wednesday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        private readonly Schedule _input_12 = new()
        {
            Id = 1L,
            OdontologistId = 1L,
            StartDay = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0, 0),
            EndDay = DayOfWeek.Monday,
            EndTime = new TimeSpan(18, 0, 0),
        };

        [TestMethod]
        public async Task AttendantAuthorized()
        {
            _authMock.Setup(x => x.IsAdmin()).Returns(false);
            _authMock.Setup(x => x.IsAttendant()).Returns(true);

            var result1 = await _model.CreateAsync(_input_11);
            var result2 = _model.FindById(_input_12.Id);
            var result3 = _model.FindAll();
            var result4 = await _model.UpdateAsync(_input_12);
            var result5 = await _model.DeleteAsync(_input_12.Id);

            Assert.AreEqual(expected: StatusCodes.Status403Forbidden, actual: result1.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result2.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status200OK, actual: result3.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status403Forbidden, actual: result4.StatusCode);
            Assert.AreEqual(expected: StatusCodes.Status403Forbidden, actual: result5.StatusCode);
        }

    }
}
