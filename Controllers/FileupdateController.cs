using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using projectManager.Areas.Upload;
using projectManager.Models;
using projectManager.Data;
using Microsoft.EntityFrameworkCore;

namespace projectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileupdateController : ControllerBase
    {

        private readonly projectDataContext _context;

        public FileupdateController(projectDataContext context)
        {
            _context = context;
        }

        [HttpPost]
        [DisableFormValueModelBinding]
        public async Task<ActionResult> Index()
        {

            string fileName = "temp.zip";
            string sourcePath = @"W:\\_web\\wileyknight\\ClientResources\\";

            FormValueProvider formModel;
            using (var stream = System.IO.File.Create(sourcePath + fileName))
            {
                formModel = await Request.StreamFile(stream);
            }

            var viewModel = new Assets();

            var bindingSuccessful = await TryUpdateModelAsync(viewModel, prefix: "",
               valueProvider: formModel);

            if (!bindingSuccessful)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
            }

            string targetPath = @"W:\\_web\\wileyknight\\ClientResources\\" + viewModel.FileLocation + "\\";

            string sourceFile = Path.Combine(sourcePath, fileName);
            string destFile = Path.Combine(targetPath, viewModel.FileName);

            Directory.CreateDirectory(targetPath);

            System.IO.File.Copy(sourceFile, destFile, true);

            return CreatedAtAction("Index", new { id = viewModel.Id }, viewModel);
        }
    }
}