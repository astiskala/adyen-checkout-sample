<?php

require('../utils/log.php');

error_log('Polling for new webhook response...');

$tmp = sys_get_temp_dir() . "/webhook";
if (file_exists($tmp)) {
  echo file_get_contents($tmp);
  unlink($tmp);
}
