<?php

namespace Afup\QuizzPhptour\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Monolog\Processor\IntrospectionProcessor;
use Monolog\Processor\MemoryUsageProcessor;
use Symfony\Bridge\Monolog\Handler\ConsoleHandler;
use Symfony\Component\Filesystem\Filesystem;

abstract class BaseCommand extends Command
{

    /**
     * @var \Monolog\Logger
     */
    protected $logger;

    /**
     * @var \Symfony\Component\Filesystem\Filesystem
     */
    protected $filesystem;


    public function __construct($name = null)
    {
        $this->filesystem = new Filesystem();
        parent::__construct($name);
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int
     */
    public function run(InputInterface $input, OutputInterface $output)
    {
        $this->initializeLogger($output);
        return parent::run($input, $output);
    }

    /**
     * @param OutputInterface $output
     */
    protected function initializeLogger(OutputInterface $output)
    {
        $monolog = new \Monolog\Logger($this->getName());
        $monolog->pushHandler(new ConsoleHandler($output));

        if ($output->getVerbosity() >= OutputInterface::VERBOSITY_DEBUG) {
            $monolog->pushProcessor(new MemoryUsageProcessor());
            $monolog->pushProcessor(new IntrospectionProcessor());
        }

        $this->logger = $monolog;
    }

    /**
     * @return \Monolog\Logger
     */
    protected function getLogger()
    {
        return $this->logger;
    }

    /**
     * @return Filesystem
     */
    protected function getFilesystem()
    {
        return $this->filesystem;
    }
}
