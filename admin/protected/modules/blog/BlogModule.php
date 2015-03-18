<?php

class BlogModule extends CWebModule
{
	public function init()
	{
		// this method is called when the module is being created
		// you may place code here to customize the module or the application

		// import the module-level models and components
		$this->setImport(array(
			'blog.models.*',
			'blog.components.*',
		));
	}

	public function beforeControllerAction($controller, $action)
	{
		if(parent::beforeControllerAction($controller, $action))
		{
			// this method is called before any module controller action is performed
			// you may place customized code here
			return true;
		}
		else
			return false;
	}

	public static function sendMail($email,$subject,$message) {
       
        $email_from = 'admin';
    	$adminEmail = "satheesh@3eplc.com";
    	$adminEmailFrom =  $email_from;
    	//$adminEmail = "satheesh@3eplc.com";
	    $headers = "MIME-Version: 1.0\r\nFrom: $adminEmailFrom\r\nReply-To: $adminEmailFrom\r\nContent-Type: text/html; charset=utf-8";
	    $message = wordwrap($message, 70);
	    $message = str_replace("\n.", "\n..", $message);
	    return mail($email,'=?UTF-8?B?'.base64_encode($subject).'?=',$message,$headers);
	}

}
