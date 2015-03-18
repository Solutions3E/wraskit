<?php

class ApiController extends Controller
{
    // Members
    /**
     * Key which has to be in HTTP USERNAME and PASSWORD headers 
     */
    Const APPLICATION_ID = 'ASCCPE';
 
    /**
     * Default response format
     * either 'json' or 'xml'
     */
    private $format = 'json';
    /**
     * @return array action filters
     */
    public function filters()
    {
            return array();
    }
 
    // Actions

    public function actionIndex() {
        echo CJSON::encode(array(1, 2, 3));
    }
    
    public function actionView()
    {

        // Check if id was submitted via GET
        if(!isset($_GET['id']))
            $this->_sendResponse(500, 'Error: Parameter <b>id</b> is missing' );
     
        $id = $_GET['id'];
        switch($_GET['model'])
        {
            
            // ******Category, questios and comments*******
            // Find respective model    

            case 'userLogin':
                
                $name      =  $_REQUEST['username'];
                $pass      =  md5($_REQUEST['password']);
                $model     = User::model()->findByAttributes(array('username'=>$name, 'password'=>$pass,'status'=>'1'));
                break;

            case 'category':
                $model     = Category::model()->findByPk($_GET['id']);
                break;
            
            case 'getSubcategories':
                $criteria  = new CDbCriteria();
                $criteria  ->addCondition("parent_id=$id");
                $model     =Category::model()->findAll($criteria);
                break;

            case 'parentCategory':
                $model     = Category::model()->findByPk($id);
                $parent_id = $model->parent_id;
                $criteria  = new CDbCriteria();
                $criteria->addCondition("id=$parent_id");
                $model     = Category::model()->findAll($criteria);
                break;

            case 'directWrasks':
                $model = Yii::app()->db->createCommand()
                        ->select('p.* , d.*')
                        ->from('post p')
                        ->join('directPost d', 'p.user_id = d.directuserId')
                        ->where('d.postId = p.id ' )
                        ->andwhere('d.directuserId = '.$id.'' , array(':directuserId' => $id))
                        ->queryAll();
                //print_r($model);
                break;

            case 'homedirectwrasks':
                $postids = array();
                $criteria = new CDbCriteria();
                $criteria ->select = 'postId';
                $criteria->addCondition("directuserId=$id");
                $results  = DirectPost::model()->findAll($criteria);
                
                foreach($results as $result) {
                    $postids[] = $result['postId'];
                }

                $criteria1= new CDbCriteria;
                $criteria1->select = "*";
                $criteria1->addInCondition('id',$postids);
                $model = Post::model()->findAll($criteria1);
                break;

            case 'homepageWrasks':
                $urls = "http://$_SERVER[HTTP_HOST]".Yii::app()->baseUrl; 
                $links = explode("/admin",$urls);
                $app_url = $links[0];
                $postids = array();

                $criteria = new CDbCriteria();
                $criteria ->select = 'postId';
                $criteria->addCondition("directuserId=$id");
                $results  = DirectPost::model()->findAll($criteria);
                
                foreach($results as $result) {
                    $postids[] = $result['postId'];
                }
  
                $criteria1 = new CDbCriteria;
                $criteria1->select = '*';
                $criteria1->addNotInCondition('t.id',$postids);
                $criteria1->join='JOIN wraskInterest ON wraskInterest.categoryId = t.category_id';
                $criteria1->addCondition("wraskInterest.userId = $id");
                $criteria1->order = "id DESC";
                $model = Post::model()->findAll($criteria1);
                break;

             case 'countuserAnswers':
                $criteria  = new CDbCriteria();
                $criteria->addCondition("userId=$id");
                $result    = Comments::model()->findAll($criteria);
                $model     = count($result);
                if(!$model) {
                    $model = "0";
                }
                break;

            //post details
            case 'question':
                $model     = Post::model()->with('categories')->findByPk($_GET['id']);
                break;

            //comment details
            case 'answer': 
                $model     = Comments::model()->findByPk($id);
                break;

            case 'editAnswer':
                    $content = $_REQUEST['answer'];
                    $model = Comments::model()->findByAttributes(array('id'=>$id));
                    $model->attributes=array('content'=>$content);
                    $model->save();
                    break;

            //Answers of one question
            case 'answers':
                $answers = Yii::app()->db->createCommand()
                    ->select('c.*,p.firstname,p.*')
                    ->from('comments c')
                    ->Join('tbl_profiles p' , 'c.userId = p.user_id')
                    ->where('postId = '.$id.'' , array(':postId' => $id))
                    ->queryAll();
                /*$criteria = new CDbCriteria;
                $criteria->select = "*";
                $criteria->addCondition("postId = $id");
                $answers = Comments::model()->with('post')->with('user')->findAll($criteria);
                print_r($answers); die;*/
                $model =  array(); 
                $i = 0;

                foreach($answers as $answer)
                {
                    $model[$i]['answerid']  = $answer['id'];
                    $model[$i]['answer']    = $answer['content'];
                    $model[$i]['userid']    = $answer['userId'];
                    $model[$i]['createDate']= $answer['createDate'];
                    $model[$i]['likes']     = $answer['likes'];
                    $model[$i]['dislikes']  = $answer['dislikes'];
                    $model[$i]['firstname'] = $answer['firstname'];
                    $model[$i]['lastname']  = $answer['lastname'];
                    $model[$i]['profilePic']= $answer['profilePic'];

                        $criteria = new CDbCriteria();
                        $criteria -> addCondition("commentId=".$answer['id']);
                        $replys    = Reply::model()->findAll($criteria);

                        $j = 0;
                            foreach($replys as $reply)
                            {
                                $model[$i]['rep'][$j]['reply']  = $reply->id;
                                $model[$i]['rep'][$j]['replycontent'] = $reply->content;
                                $model[$i]['rep'][$j]['replyuid']     = $reply->userId;
                                $model[$i]['rep'][$j]['replycdate']   = $reply->createDate;
                                $j++;
                            }
                    $i++;
                }
                break;

            //coment replies
            case 'answerComments':
                /*$model    = Reply::model()->findByPk($id);
                $answerId = $model->commentId;*/
                $criteria = new CDbCriteria();
                $criteria -> addCondition("commentId=$id");
                $model    = Reply::model()->findAll($criteria);
                break;

            case 'userQuestions':
                $criteria = new CDbCriteria();
                $criteria -> addCondition("user_id=$id");
                $model    = Post::model()->findAll($criteria);
                break;

            case 'countuserQuestions':
                $criteria = new CDbCriteria();
                $criteria -> addCondition("user_id=$id");
                $result    = Post::model()->findAll($criteria);
                $model     = count($result);
                if(!$model) {
                    $model = "0";
                }
                break;

            case 'userAnswers':
                $criteria = new CDbCriteria();
                $criteria -> addCondition("userId=$id");
                $model    = Comments::model()->findAll($criteria);
                break;

            // *****User and profiles*****

            case 'userProfile':
                $result = User::model()->with('profile')->findByPk($id);
                $model['firstname']     = $result->profile['firstname'];
                $model['lastname']      = $result->profile['lastname'];
                $model['profilePic']    = $result->profile['profilePic'];
                break;

            case 'userDetails':
                $model = Yii::app()->db->createCommand()
                        ->select('*')
                        ->from('tbl_users u')
                        ->join('tbl_profiles p', 'u.id=p.user_id')
                        ->where('id=:id', array(':id'=>$id))
                        ->queryRow();
                break;
            case 'connectInUsers':
                
                $model = array();
                //$arr1 = Connects::model()->findByAttributes(array('userId'=>$id));
                //$arr2 = Connects::model()->findByAttributes(array('connectId'=>$id));
                $criteria = new CDbCriteria();
                $criteria->select = array('connectId');
                $criteria->addCondition("userId=$id");
                $arr1 = Connects::model()->findAll($criteria);

                $a1[]     = '';
                $a2[]     = '';
                $i      = 0;
                $arr3   = 0;
                foreach ($arr1 as $ar1) {
                    $a1[$i] = $ar1['connectId'];
                    $i++;
                }


                $criteria   = new CDbCriteria();
                $criteria   ->select = array('userId');
                $criteria   ->addCondition("connectId=$id");
                $arr2       = Connects::model()->findAll($criteria);

                $j = 0;
                foreach ($arr2 as $ar2) {
                    $a2[$j] = $ar2['userId'];
                    $j++;
                }

                if($a1 AND $a2) {
                    $arr3       = array_merge($a1, $a2);
                } else if($a1 AND !$a2) {
                    $arr3       = $a1;
                } else if(!$a1 AND $a2) {
                    $arr3       = $a2;
                }
                //$arr3[] = $id;

                $results  = Yii::app()->db->createCommand()
                        ->select('*')
                        ->from('tbl_profiles')
                        ->where(array('in', 'user_id', $arr3))
                        //->andwhere('name = :name', array('idName'=>$name))
                        ->queryAll();
                
                    //echo $results['0']['user_id'];

                    $i=0;
                    foreach ($results as $result) {
                        $model[$i]['user_id']   = $result['user_id'];
                        $model[$i]['firstname'] = $result['firstname'];
                        $model[$i]['lastname']  = $result['lastname'];
                        $model[$i]['profilePic']= $result['profilePic'];

                            $criteria = new CDbCriteria();
                            $criteria->addCondition("userId='".$result['user_id']."'");
                            $connects = Connects::model()->findAll($criteria);
                            
                            $criteria = new CDbCriteria();
                            $criteria->addCondition("id='".$result['user_id']."'");
                            $points   = User::model()->find($criteria);

                                $model[$i]['count'] = count($connects);
                                //$model[$i]['point'] = $points['wraskpoints'];


                                $points    = $points['wraskpoints'];
                                settype($points, "int");
                                $result     = $points / 100;
                                settype($result, "int");
                                $model[$i]['point'] = $result;
                                if($result >= 5) {
                                    $model[$i]['point'] = 5;
                                }
                        $i++;
                    }
                break;

            case 'connectUser':
                $model    = new Connects;
                $model ->userId    = $id;
                $model ->connectId = $_REQUEST['connect_id'];
                $model->insert();
                break;

            case 'disconnectUser':
                $userId    = $id;
                $connectId = $_REQUEST['connect_id'];
                $model = Connects::model()->deleteAllByAttributes(array('userId'=>$id,'connectId'=>$connectId));
                break;

            case 'connectedUsers':
                $model = array();
                $criteria = new CDbCriteria();
                $criteria->select = array('connectId');
                $criteria->addCondition("userId=$id");
                $arr1 = Connects::model()->findAll($criteria);

                $a1     = array();
                $a2     = array();
                $i      = 0;
                $arr3   = 0;
                foreach ($arr1 as $ar1) {
                    $a1[$i] = $ar1['connectId'];
                    $i++;
                }
                
                $criteria   = new CDbCriteria();
                $criteria   ->select = array('userId');
                $criteria   ->addCondition("connectId=$id");
                $arr2       = Connects::model()->findAll($criteria);

                $j = 0;
                foreach ($arr2 as $ar2) {
                    $a2[$j] = $ar2['userId'];
                    $j++;
                }
                
                if($a1 AND $a2) {
                    $arr3       = array_merge($a1, $a2);
                } else if($a1 AND !$a2) {
                    $arr3       = $a1;
                } else if(!$a1 AND $a2) {
                    $arr3       = $a2;
                }
                //$arr3[] = $id;
                $model  = Yii::app()->db->createCommand()
                        ->select('*')
                        ->from('tbl_profiles')
                        ->where(array('in', 'user_id', $arr3))
                        //->andwhere('name = :name', array('idName'=>$name))
                        ->queryAll();
                break;

            case 'countMyconnects':
                $criteria = new CDbCriteria();
                $criteria->addCondition("userId=$id");
                $result    = Connects::model()->findAll($criteria);
                $model = count($result);
                if(!$model) {
                    $model = "0";
                }
                break;

            case 'userConnects':
                $criteria = new CDbCriteria();
                $criteria->addCondition("userId=$id");
                $model    = Connects::model()->findAll($criteria);
                break;

            case 'isUserconnected':
                $pid = $_REQUEST['connect_id'];
                $model  = Yii::app()->db->createCommand()
                            ->select('*')
                            ->from('connects')
                            ->where("userId=$id AND connectId=$pid")
                            ->queryAll();
                break;

            case 'userProfile':
                $model    = Profile::model()->findByPk($id);
                break;

            case 'profileRating':
                $criteria = new CDbCriteria();
                $criteria->select = 'id, username,wraskpoints';
                $criteria->addCondition("id=$id");
                $result    = User::model()->find($criteria);
                $points    = $result['wraskpoints'];
                settype($points, "int");
                $result     = $points / 100;
                settype($result, "int");
                $model['point'] = $result;
                break;

            case 'topUsersoftheMonth';

                $model = array();
                if( ! ini_get('date.timezone') ) {
                        date_default_timezone_set('GMT');
                    }

                $month = date('n');

                $result = Yii::app()->db->createCommand()
                                //->select('q.*,q.createDate as qdate,COUNT(*)')
                                ->select('q.user_id, COUNT(*) as ct ')
                                ->from('post q')
                                ->join('comments c','c.userId = q.user_id')
                                ->where ("MONTH(q.createDate)=$month")
                                ->andwhere ("MONTH(c.createDate)=$month")
                                ->order('ct DESC')
                                ->limit('5')
                                ->group ('c.userId')
                                ->queryAll();

                $i = 0;
                foreach($result as $res) {

                    $user = Profile::model()->findByPk($res['user_id']);
                        
                        $model[$i]['user_id'] = $user->user_id;
                        $model[$i]['firstname'] = $user->firstname;
                        $model[$i]['lastname'] = $user->lastname;
                        $model[$i]['profilePic'] = $user->profilePic;
                        $i++;
                }
                break;
            case 'getBlog':
                $model = Blog::model()->findAll();
                break;

            case 'getPrivacy':
                $criteria = new CDbCriteria();
                $criteria->select = 't.privacy';
                $criteria->addCondition("id=$id");
                $model    = Post::model()->findAll($criteria);
                break;

            //********INSERTING DATAS IN TABLES*********   

            case 'submitAnswer':

                $model = new Comments;

                $model->content    = $_REQUEST['answer'];
                $model->userId     = $_REQUEST['userId'];
                //$createDate = $_POST['createDate'];
                $model->postId     = $_REQUEST['postId'];
                //$likes      = $_REQUEST['likes'];
                //$dislikes   = $_POST['dislikes'];
                $userid = $model->userId;

                $model->insert();

                //update points
                $result = User::model()->findByPk($userid);
                $points = $result->wraskpoints;
                $points = $points+1;;

                $command = Yii::app()->db->createCommand();
                $update = $command->update('tbl_users', array(
                                            'wraskpoints'=>$points,
                                        ), 'id=:id', array(':id'=>$userid));
                break;

            case 'likeAnswer':
                $model   = Comments::model()->findByPk($id);
                $likes   = $model->likes + 1;
                $command = Yii::app()->db->createCommand();
                $model = $command->update('comments', array(
                                            'likes'=>$likes,
                                        ), 'id=:id', array(':id'=>$id));
                break;

            case 'dislikeAnswer':
                $model  = Comments::model()->findByPk($id);
                $dislikes = $model->dislikes + 1;
                $command  = Yii::app()->db->createCommand();
                $model    = $command->update('comments',array(
                                            'dislikes' => $dislikes,
                                            ),'id=:id', array(':id'=>$id) );
                break;
            case 'userRegister':
                
                $email = $_GET['email'];
                $username = $_GET['username'];
                
                $query_email = "SELECT * FROM tbl_users  WHERE email = '$email' ";
                $command_email = Yii::app()->db->createCommand($query_email);
                $model_result_email = $command_email->queryAll();

                $query_user = "SELECT * FROM tbl_users  WHERE username = '$username' ";
                $command_user = Yii::app()->db->createCommand($query_user);
                $model_result_user = $command_user->queryAll();
           
               if( (!empty($model_result_email)) ) {
                
                    $model = array("status" => '0', 'email_exist' => 'Email id already exist' );

                    $this->_sendResponse(200, CJSON::encode($model));   
              
               } elseif(!empty($model_result_user)) {
                
                    $model = array("status" => '0', 'user_exist' => 'Username already exist' );

                    $this->_sendResponse(200, CJSON::encode($model));   

                    exit;  
               
               } else {

                    $model   = new User;
                    $profile = new Profile;
                    $model->username = $_GET['username'];
                    $model->password = md5($_GET['password']);
                    $model->email    = $_GET['email'];
                    $model->wraskpoints = '0';


                    $profile->firstname = $_REQUEST['firstname'];
                    $profile->lastname  = $_REQUEST['lastname'];

                            $model->activkey=UserModule::encrypting(microtime().$model->password);
                            $model->password=UserModule::encrypting($_GET['password']);
                            //$model->verifyPassword=UserModule::encrypting($model->verifyPassword);
                            $model->superuser=0;
                            $model->status=1;

                    if ($model->validate()){
                        $model->insert();
                        $profile->user_id = $model->id;
                        $profile->insert();

                        $activation_url = $this->createAbsoluteUrl('/user/activation/activation',array("activkey" => $model->activkey, "email" => $model->email));
                        UserModule::sendMail($model->email,UserModule::t("Registration succeful!"),UserModule::t("Congratulations! Your registration is completed successfully"));

                    } else {
                        print_r($model->errors);
                    }
                }
                break;

            case 'sendMail':
                $model   = new User;
                $profile = new Profile;
                //$model->username = $_GET['username'];
                $model->password = md5("admin");
                $model->email    = "satheesh@3eplc.com";

                        $model->activkey=UserModule::encrypting(microtime().$model->password);
                        $model->password=UserModule::encrypting($model->password);
                        //$model->verifyPassword=UserModule::encrypting($model->verifyPassword);
                        $model->superuser=0;
                        $model->status=User::STATUS_NOACTIVE;

                echo $activation_url = $this->createAbsoluteUrl('/api/resetPassword/1',array("activkey" => $model->activkey, "email" => $model->email));
                UserModule::sendMail($model->email,UserModule::t("You registered from {site_name}",array('{site_name}'=>"siteName")),UserModule::t("Please activate you account go to {activation_url}",array('{activation_url}'=>$activation_url)));
                break;

            case 'forgotPassword':
                $user = new User;
                $email = $_GET['email'];
                $newpassword = rand();
                $model     = User::model()->findByAttributes(array('email'=>$email));

                //$activation_url = 'http://' . $_SERVER['HTTP_HOST'].$this->createUrl(implode(Yii::app()->controller->module->recoveryUrl),array("activkey" => $user->activkey, "email" => $user->email));
                $activation_url = $this->createAbsoluteUrl('/user/activation/activation',array("activkey" => $newpassword, "email" => $model->email));
                $subject = UserModule::t("You have requested the password recovery site {site_name}",
                        array(
                            '{site_name}'=>Yii::app()->name,
                        ));
                $message = UserModule::t("You have requested the password recovery site {site_name}. ",
                        array(
                            '{site_name}'=>Yii::app()->name,
                            '{newpassword}'=>$newpassword,
                        ));
                
                UserModule::sendMail($email,$subject,$message);
                break;


            //dino
            case 'update_profile':

                $fname = $_REQUEST['fname'];
                $lname = $_REQUEST['lname'];
                $email = $_REQUEST['email'];

                $love  = $_REQUEST['love'];
                $hate  = $_REQUEST['hate'];
                $city  = $_REQUEST['city'];
                $state = $_REQUEST['state'];

                $command = Yii::app()->db->createCommand();
                $model = $command->update('tbl_users', array(
                                            'email'=>$email,
                                        ), 'id=:id', array(':id'=>$id));

                $command = Yii::app()->db->createCommand();
                $model = $command->update('tbl_profiles', array(
                                            'firstname'=>$fname,
                                            'lastname'=>$lname,
                                            'love'=>$love,
                                            'hate'=>$hate,
                                            'city'=>$city,
                                            'state'=>$state,
                                        ), 'user_id=:user_id', array(':user_id'=>$id));
                break;

            case 'change_password':
                $user_details = Yii::app()->db->createCommand()
                        ->select('*')
                        ->from('tbl_users u')
                        ->where('id=:id', array(':id'=>$id))
                        ->queryRow();

                $pwd = $user_details['password']; 
                $cpwd = $_REQUEST['cpassword'];
                $npwd = $_REQUEST['npassword'];

                $cpwd = md5($cpwd);

                if($pwd != $cpwd)
                {
                    $model = array("status" => "failed", "message" => "Error in current password");
                }
                else
                {
                    $command = Yii::app()->db->createCommand();
                    $model = $command->update('tbl_users', array(
                                            'password'=>md5($npwd),
                                        ), 'id=:id', array(':id'=>$id));
                    $model = array("status" => "success", "message" => "Password changed successfully");
                }
                break;

            case 'getUserofQuestion':
                $model = Post::model()->findByPk($id);
                break;

            case 'submitReply':
                $model = new Reply;
                $model->content     = $_REQUEST['content'];
                $model->userId      = $_REQUEST['userId'];
                $model->commentId   = $_REQUEST['id'];
                $model->insert();
                break;

            case 'searchPosts':
                //$result = Post::model()->findAll();
                $model  = Yii::app()->db->createCommand()
                            ->select('p.*,q.*')
                            ->from('post q')
                            ->join('tbl_profiles p', 'p.user_id=q.user_id')
                            ->queryAll();
                break;


            case 'wraskInterestsss': 
                $categoryId = $_REQUEST['catId'];
                $command = Yii::app()->db->createCommand();

                $model = $command->update('wraskInterest', array(
                                            'categoryId'=>$categoryId,
                                        ), 'userId=:userId', array(':userId'=>$id));
                break;
           
            default:
                $this->_sendResponse(501, sprintf(
                    'Mode <b>view</b> is not implemented for model <b>%s</b>',
                    $_GET['model']) );
                Yii::app()->end();
        }
        // Did we find the requested model? If not, raise an error
        if(is_null($model))
            
            $this->_sendResponse(404, 'No Item found with id '.$_GET['id']);
        else
            $this->_sendResponse(200, CJSON::encode($model));
    }
    public function actionList()
    {
        // Get the respective model instance
        switch($_GET['model'])
        {
            case 'getcategories':
                $criteria  = new CDbCriteria();
                $criteria -> addCondition("parent_id=0");
                $models     = Category::model()->findAll($criteria);
                break;
            
            default:
                // Model not implemented error
                $this->_sendResponse(501, sprintf(
                    'Error: Mode <b>list</b> is not implemented for model <b>%s</b>',
                    $_GET['model']) );
                Yii::app()->end();
        }
        // Did we get some results?
        if(empty($models)) {
            // No
            $this->_sendResponse(200, 
                    sprintf('No items where found for model <b>%s</b>', $_GET['model']) );
        } else {
            // Prepare response
            $rows = array();
            foreach($models as $model)
                $rows[] = $model->attributes;
            // Send the response
            $this->_sendResponse(200, CJSON::encode($rows));
        }
    }

    public function actionCreate()
    {


        switch($_GET['model'])
        {
            // Get an instance of the respective model
            case 'posts':
                $model = new Post;                    
                break;
            
            
            //jun 6
            case 'submitQuestion':

                $post       = file_get_contents("php://input");
                $model      = new Post;
                $directpost = new DirectPost();

                $data = CJSON::decode($post, true);
                
                $model->title       = substr($data['question'], 0 , 50);
                $model->content     = $data['question'];
                $model->user_id     = $data['userid'];
                $model->category_id = $data['catId'];
                $model->privacy     = $data['privacy'];

                //update points
                $userid = $model->user_id;
                $result = User::model()->findByPk($userid);
                $points = $result->wraskpoints;
                $points = $points+1;;

                $command = Yii::app()->db->createCommand();
                $update = $command->update('tbl_users', array(
                                            'wraskpoints'=>$points,
                                        ), 'id=:id', array(':id'=>$userid));
                //for direct user
                $model->insert();
                if($data['privacy'] == '2'){
                    $directpost->directuserId = $data['direct_user'];
                    $directpost->postId       = $model->id;
                    $directpost->insert();
                }
                break;

            case 'changeProfilePic':

                $post       = file_get_contents("php://input");
                //$model      = new Post;

                $data = CJSON::decode($post, true);
                print_r($data);
                //echo $temp = $data['pic'];
                die;
                $file1 = explode('\\',$temp);
                //print_r($file1);
                echo $file = $file1['2'];
                //die;
                move_uploaded_file($temp, "../images/" . $file);
                
                die;
                break;

            case 'wraskInterest':

                $post  = file_get_contents("php://input");
                $data = CJSON::decode($post, true);

                $count = count($data['catId']);
                $userId     = $data['userId'];
                //$categoryId = $data['catId'][0];

                $result     = WraskInterest::model()->findByAttributes(array('userId'=>$userId));
                //delete previous datas
                $row = WraskInterest::model()->deleteAllByAttributes(array('userId'=>$userId));

                for($i=0; $i<$count; $i++) {
                    $model      = new WraskInterest;
                    $model->userId     = $userId;
                    $model->categoryId = $data['catId'][$i];
                    $model->save();
                }
                
                break;

            case 'askQuestion':
                
                $model      = new Post;
                $title      = $_POST['title'];
                $content    = $_POST['content'];
                $category_id= $_POST['category_id'];
                $user_id    = $_POST['user_id'];
                $likes      = $_POST['likes'];
                $dislikes   = $_POST['dislikes'];
                $privacy    = $_POST['privacy'];
                $model->save();
                break;


            default:
                $this->_sendResponse(501, 
                    sprintf('Mode <b>create</b> is not implemented for model <b>%s</b>',
                    $_GET['model']) );
                    Yii::app()->end();
        }
        // Try to assign POST values to attributes
        foreach($_POST as $var=>$value) {
            // Does the model have this attribute? If not raise an error
            if($model->hasAttribute($var))
                $model->$var = $value;
            else
                $this->_sendResponse(500, 
                    sprintf('Parameter <b>%s</b> is not allowed for model <b>%s</b>', $var,
                    $_GET['model']) );
        }
        // Try to save the model
        if($model->save())
            $this->_sendResponse(200, CJSON::encode($model));
        else {
            // Errors occurred
            $msg = "<h1>Error</h1>";
            $msg .= sprintf("Couldn't create model <b>%s</b>", $_GET['model']);
            $msg .= "<ul>";
            foreach($model->errors as $attribute=>$attr_errors) {
                $msg .= "<li>Attribute: $attribute</li>";
                $msg .= "<ul>";
                foreach($attr_errors as $attr_error)
                    $msg .= "<li>$attr_error</li>";
                $msg .= "</ul>";
            }
            $msg .= "</ul>";
            $this->_sendResponse(500, $msg );
        }
    }

    public function actionDelete()
    {
        switch($_GET['model'])
        {
            // Load the respective model
            case 'posts':
                $model = Post::model()->findByPk($_GET['id']);                    
                break;
            default:
                $this->_sendResponse(501, 
                    sprintf('Error: Mode <b>delete</b> is not implemented for model <b>%s</b>',
                    $_GET['model']) );
                Yii::app()->end();
        }
        // Was a model found? If not, raise an error
        if($model === null)
            $this->_sendResponse(400, 
                    sprintf("Error: Didn't find any model <b>%s</b> with ID <b>%s</b>.",
                    $_GET['model'], $_GET['id']) );
     
        // Delete the model
        $num = $model->delete();
        if($num>0)
            $this->_sendResponse(200, $num);    //this is the only way to work with backbone
        else
            $this->_sendResponse(500, 
                    sprintf("Error: Couldn't delete model <b>%s</b> with ID <b>%s</b>.",
                    $_GET['model'], $_GET['id']) );
    }

    public function actionUpdate()
    {
        // Parse the PUT parameters. This didn't work: parse_str(file_get_contents('php://input'), $put_vars);
        $json = file_get_contents('php://input'); //$GLOBALS['HTTP_RAW_POST_DATA'] is not preferred: http://www.php.net/manual/en/ini.core.php#ini.always-populate-raw-post-data
        $put_vars = CJSON::decode($json,true);  //true means use associative array
     
        switch($_GET['model'])
        {
            // Find respective model
            case 'posts':
                $model = Post::model()->findByPk($_GET['id']);                    
                break;


            default:
                $this->_sendResponse(501, 
                    sprintf( 'Error: Mode <b>update</b> is not implemented for model <b>%s</b>',
                    $_GET['model']) );
                Yii::app()->end();
        }
        // Did we find the requested model? If not, raise an error
        if($model === null)
            $this->_sendResponse(400, 
                    sprintf("Error: Didn't find any model <b>%s</b> with ID <b>%s</b>.",
                    $_GET['model'], $_GET['id']) );
     
        // Try to assign PUT parameters to attributes
        foreach($put_vars as $var=>$value) {
            // Does model have this attribute? If not, raise an error
            if($model->hasAttribute($var))
                $model->$var = $value;
            else {
                $this->_sendResponse(500, 
                    sprintf('Parameter <b>%s</b> is not allowed for model <b>%s</b>',
                    $var, $_GET['model']) );
            }
        }
        // Try to save the model
        if($model->save())
            $this->_sendResponse(200, CJSON::encode($model));
        else
            // prepare the error $msg
            // see actionCreate
            // ...
            $this->_sendResponse(500, $msg );
    }

    private function _sendResponse($status = 200, $body = '', $content_type = 'text/html')
    {
        $status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
        // set the status
        header($status_header);
        // set the content type
        header('Content-type: ' . $content_type);

        // pages with body are easy
        if($body != '')
        {
            // send the body
            echo $body;
            exit;
        }
        // we need to create the body if none is passed
        else
        {
            // create some body messages
            $message = '';

            // this is purely optional, but makes the pages a little nicer to read
            // for your users.  Since you won't likely send a lot of different status codes,
            // this also shouldn't be too ponderous to maintain
            switch($status)
            {
                case 401:
                    $message = 'You must be authorized to view this page.';
                    break;
                case 404:
                    $message = 'The requested URL ' . $_SERVER['REQUEST_URI'] . ' was not found.';
                    break;
                case 500:
                    $message = 'The server encountered an error processing your request.';
                    break;
                case 501:
                    $message = 'The requested method is not implemented.';
                    break;
            }

            // servers don't always have a signature turned on (this is an apache directive "ServerSignature On")
            $signature = ($_SERVER['SERVER_SIGNATURE'] == '') ? $_SERVER['SERVER_SOFTWARE'] . ' Server at ' . $_SERVER['SERVER_NAME'] . ' Port ' . $_SERVER['SERVER_PORT'] : $_SERVER['SERVER_SIGNATURE'];

            // this should be templatized in a real-world solution
            $body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
                                <title>' . $status . ' ' . $this->_getStatusCodeMessage($status) . '</title>
                            </head>
                            <body>
                                <h1>' . $this->_getStatusCodeMessage($status) . '</h1>
                                <p>' . $message . '</p>
                                <hr />
                                <address>' . $signature . '</address>
                            </body>
                        </html>';

            echo $body;
            exit;
        }
    } 
    private function _getStatusCodeMessage($status)
    {
        // these could be stored in a .ini file and loaded
        // via parse_ini_file()... however, this will suffice
        // for an example
        $codes = Array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Unused)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported'
        );

        return (isset($codes[$status])) ? $codes[$status] : '';
    }

    private function _getObjectEncoded($model, $array)
    {
        if(isset($_GET['format']))
            $this->format = $_GET['format'];

        if($this->format=='json')
        {
            return CJSON::encode($array);
        }
        elseif($this->format=='xml')
        {
            $result = '<?xml version="1.0">';
            $result .= "\n<$model>\n";
            foreach($array as $key=>$value)
                $result .= "    <$key>".utf8_encode($value)."</$key>\n"; 
            $result .= '</'.$model.'>';
            return $result;
        }
        else
        {
            return;
        }
    }
    /*public function actionCreate()
    {
    }
    public function actionUpdate()
    {
    }
    public function actionDelete()
    {
    }*/
}