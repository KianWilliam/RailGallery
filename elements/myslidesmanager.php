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

defined('_JEXEC') or die('Restricted access');

JText::script('MOD_SELECT_IMAGE_LABEL');
JText::script('MOD_SELECT_IMAGE_DESC');
JText::script('MOD_IMAGE_TEXT_LABEL');
JText::script('MOD_IMAGE_TEXT_DESC');
JText::script('MOD_SLIDESHOW_REMOVE2');
JText::script('MOD_SLIDESHOW_SELECTIMAGE');

jimport('joomla.html.html');
jimport('joomla.form.formfield');

class JFormFieldMyslidesmanager extends JFormField {

protected $type = 'myslidesmanager';

	protected function getInput() {

		$document = JFactory::getDocument();
		$document->addScriptDeclaration("JURI='" . JURI::root() . "'");
		$path = 'modules/mod_railgallery/elements/myslides/';
		JHTML::_('behavior.modal');		
		JHTML::_('stylesheet', $path . 'slides3.css');
		JHTML::_('script', $path . 'slides.js');
		$html = '<input name="' . $this->name . '" id="myslides" type="hidden" value="' . $this->value . '" />'
				. '<input name="myaddslide" id="myaddslide"  type="button" value="' . JText::_('MOD_RAILGALLERY_ADDSLIDE') . '"  onclick="javascript:addslidemy();" />'
				. '<ul id="myslideslist" style="clear:both;"></ul>'
				. '<input name="myaddslide" id="myaddslide" type="button" value="' . JText::_('MOD_RAILGALLERY_ADDSLIDE') . '"  onclick="javascript:addslidemy();" />';

		return $html;
	}

	protected function getPathToImages() {
		$localpath = dirname(__FILE__);
		$rootpath = JPATH_ROOT;
		$httppath = trim(JURI::root(), "/");
		$pathtoimages = str_replace("\\", "/", str_replace($rootpath, $httppath, $localpath));
		return $pathtoimages;
	}

	protected function getLabel() {

		return '';
	}

	


}

?>