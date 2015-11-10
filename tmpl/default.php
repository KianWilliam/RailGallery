<?php 

/**
 * @package Module RailGallery for Joomla! 3.x
 * @version $Id: mod_railgallery 1.0.0 2015-01-01 23:26:33Z $
 * @author Kian William Nowrouzian
 * @copyright (C) 2015- Kian William Nowrouzian
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 
 This file is part of railgallery.
    railgallery is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    railgallery is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with railgallery.  If not, see <http://www.gnu.org/licenses/>.
 
**/


?>

<?php 
defined('_JEXEC') or die('Restricted Access'); 
$document = &JFactory::getDocument();
$document->addStyleSheet(JURI::base()."modules/mod_railgallery/css/mystyles.css");
if($params->get('lib')==1)
{
  $document->addScript(JURI::base()."modules/mod_railgallery/js/jquery.js");
}
$myvar = " var RG = jQuery.noConflict();";
$document->addScriptDeclaration($myvar);
$document->addScript(JURI::base()."modules/mod_railgallery/js/rgallery.js");
$contentb="

	RG(document).ready(function(){	
	RG('#containerd').supergallery({width:'".$galleryWidth."', height:'".$galleryHeight."', color:'".$color."', speed:'".$speed."', 
	fontFamily:'".$fontFamily."', fontWeight:'".$fontWeight."', fontStyle:'".$fontStyle."'});	
	});
	
	RG.fn.supergallery.defaults = {};
	RG.fn.supergallery.defaults.fontWeight ='bold';
	RG.fn.supergallery.defaults.fontStyle='normal';
	RG.fn.supergallery.defaults.width='600';
	RG.fn.supergallery.defaults.height='150';
	RG.fn.supergallery.defaults.color='#e41952';
	RG.fn.supergallery.defaults.speed='2000';
	RG.fn.supergallery.defaults.fontFamily='Arial';
	RG.fn.supergallery.defaults.images = [];
	RG.fn.supergallery.defaults.descs = [];
	var myimages = ".json_encode($images).";
	var mytexts = ".json_encode($texts).";
	for(var i=0; i<myimages.length; i++)
	{
	  RG.fn.supergallery.defaults.images[i]=myimages[i];
	  RG.fn.supergallery.defaults.descs[i]=mytexts[i];
	 }
";
$document->addScriptDeclaration($contentb);
?>

<div id="containerd">
</div>

