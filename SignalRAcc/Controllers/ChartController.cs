using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using SignalRAcc.DataStorage;
using SignalRAcc.HubConfig;
using SignalRAcc.TimeFeatures;

namespace SignalRAcc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChartController : ControllerBase
    {
        private IHubContext<ChartHub> _hub;
        
        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        public IActionResult Get()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData(Program.data.Data)));  //then 2 clients connected it's sends data 2 times faster :/
            return Ok(new { Message = "Request Completed" });
        }
        
    }
}
